// utils/courierServices.js

/**
 * Courier Guy API Integration
 * Documentation: https://www.thecourierguy.co.za/api
 */
export class CourierGuyService {
  constructor() {
    this.apiKey = process.env.COURIER_GUY_API_KEY;
    this.apiUrl = process.env.COURIER_GUY_API_URL || 'https://api.thecourierguy.co.za';
  }

  async getQuote(shipment) {
    try {
      const response = await fetch(`${this.apiUrl}/v1/quotes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collection_address: {
            type: 'business',
            company: shipment.from.company,
            street_address: shipment.from.address,
            local_area: shipment.from.suburb,
            city: shipment.from.city,
            code: shipment.from.postalCode,
            province: shipment.from.province,
            country: 'ZA',
          },
          delivery_address: {
            type: shipment.to.type || 'residential',
            company: shipment.to.company,
            street_address: shipment.to.address,
            local_area: shipment.to.suburb,
            city: shipment.to.city,
            code: shipment.to.postalCode,
            province: shipment.to.province,
            country: 'ZA',
          },
          parcels: shipment.parcels.map(p => ({
            parcel_description: p.description,
            submitted_length_cm: p.length || 30,
            submitted_width_cm: p.width || 30,
            submitted_height_cm: p.height || 30,
            submitted_weight_kg: p.weight || 1,
          })),
          declared_value: shipment.declaredValue || 0,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get Courier Guy quote');
      }

      return await response.json();
    } catch (error) {
      console.error('Courier Guy quote error:', error);
      throw error;
    }
  }

  async createShipment(order, selectedService) {
    try {
      const response = await fetch(`${this.apiUrl}/v1/shipments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_level: selectedService.code,
          collection_address: order.collectionAddress,
          delivery_address: order.deliveryAddress,
          parcels: order.parcels,
          collection_min_date: new Date().toISOString().split('T')[0],
          delivery_min_date: selectedService.estimatedDeliveryDate,
          special_instructions_collection: order.collectionNotes,
          special_instructions_delivery: order.deliveryNotes,
          declared_value: order.declaredValue,
          custom_tracking_reference: order.orderNumber,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create Courier Guy shipment');
      }

      return await response.json();
    } catch (error) {
      console.error('Courier Guy shipment error:', error);
      throw error;
    }
  }

  async trackShipment(trackingNumber) {
    try {
      const response = await fetch(
        `${this.apiUrl}/v1/tracking/${trackingNumber}`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to track shipment');
      }

      return await response.json();
    } catch (error) {
      console.error('Courier Guy tracking error:', error);
      throw error;
    }
  }
}

/**
 * Fastway API Integration
 * Documentation: https://www.fastway.co.za/api-integration
 */
export class FastwayService {
  constructor() {
    this.apiKey = process.env.FASTWAY_API_KEY;
    this.franchiseCode = process.env.FASTWAY_FRANCHISE_CODE;
    this.apiUrl = process.env.FASTWAY_API_URL || 'https://api.fastway.co.za';
  }

  async getQuote(shipment) {
    try {
      const response = await fetch(`${this.apiUrl}/v4/pudo/quote`, {
        method: 'POST',
        headers: {
          'api_key': this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          franchisecode: this.franchiseCode,
          destination: {
            type: shipment.to.type || 'residential',
            postal_code: shipment.to.postalCode,
            suburb: shipment.to.suburb,
          },
          items: shipment.parcels.map(p => ({
            references: [p.reference || ''],
            weight: p.weight || 1,
            length: p.length || 30,
            width: p.width || 30,
            height: p.height || 30,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get Fastway quote');
      }

      return await response.json();
    } catch (error) {
      console.error('Fastway quote error:', error);
      throw error;
    }
  }

  async createShipment(order, selectedService) {
    try {
      const response = await fetch(`${this.apiUrl}/v4/pudo/create`, {
        method: 'POST',
        headers: {
          'api_key': this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          franchisecode: this.franchiseCode,
          service_level: selectedService.code,
          destination: order.deliveryAddress,
          items: order.parcels,
          collection_info: {
            company_name: order.collectionAddress.company,
            contact_name: order.collectionAddress.contactName,
            contact_phone: order.collectionAddress.phone,
            address: order.collectionAddress.streetAddress,
            suburb: order.collectionAddress.suburb,
            postal_code: order.collectionAddress.postalCode,
          },
          reference: order.orderNumber,
          instructions: order.deliveryNotes,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create Fastway shipment');
      }

      return await response.json();
    } catch (error) {
      console.error('Fastway shipment error:', error);
      throw error;
    }
  }

  async trackShipment(trackingNumber) {
    try {
      const response = await fetch(
        `${this.apiUrl}/v4/tracktrace/detail/${trackingNumber}`,
        {
          headers: {
            'api_key': this.apiKey,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to track shipment');
      }

      return await response.json();
    } catch (error) {
      console.error('Fastway tracking error:', error);
      throw error;
    }
  }
}

/**
 * PUDO Locker Integration
 * Documentation: https://www.pudo.co.za/api
 */
export class PUDOLockerService {
  constructor() {
    this.apiKey = process.env.PUDO_API_KEY;
    this.apiUrl = process.env.PUDO_API_URL || 'https://api.pudo.co.za';
  }

  async findNearbyLockers(postalCode, city) {
    try {
      const response = await fetch(
        `${this.apiUrl}/v1/lockers/search?postal_code=${postalCode}&city=${city}`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to find PUDO lockers');
      }

      return await response.json();
    } catch (error) {
      console.error('PUDO locker search error:', error);
      throw error;
    }
  }

  async createDelivery(order, lockerId) {
    try {
      const response = await fetch(`${this.apiUrl}/v1/deliveries`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          locker_id: lockerId,
          recipient: {
            name: order.recipientName,
            phone: order.recipientPhone,
            email: order.recipientEmail,
          },
          parcel: {
            reference: order.orderNumber,
            description: order.description,
            weight: order.weight,
            dimensions: {
              length: order.length,
              width: order.width,
              height: order.height,
            },
          },
          sender: {
            name: order.senderName,
            phone: order.senderPhone,
            reference: order.orderNumber,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create PUDO delivery');
      }

      return await response.json();
    } catch (error) {
      console.error('PUDO delivery error:', error);
      throw error;
    }
  }

  async trackDelivery(trackingNumber) {
    try {
      const response = await fetch(
        `${this.apiUrl}/v1/deliveries/${trackingNumber}/track`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to track PUDO delivery');
      }

      return await response.json();
    } catch (error) {
      console.error('PUDO tracking error:', error);
      throw error;
    }
  }
}

/**
 * Unified Courier Service Manager
 */
export class CourierServiceManager {
  constructor() {
    this.courierGuy = new CourierGuyService();
    this.fastway = new FastwayService();
    this.pudo = new PUDOLockerService();
  }

  async getAllQuotes(shipment) {
    const quotes = [];

    try {
      const courierGuyQuote = await this.courierGuy.getQuote(shipment);
      quotes.push({
        provider: 'courier-guy',
        name: 'The Courier Guy',
        ...courierGuyQuote,
      });
    } catch (error) {
      console.error('Courier Guy quote failed:', error);
    }

    try {
      const fastwayQuote = await this.fastway.getQuote(shipment);
      quotes.push({
        provider: 'fastway',
        name: 'Fastway Couriers',
        ...fastwayQuote,
      });
    } catch (error) {
      console.error('Fastway quote failed:', error);
    }

    return quotes.sort((a, b) => a.price - b.price);
  }

  async createShipment(provider, order, service) {
    switch (provider) {
      case 'courier-guy':
        return await this.courierGuy.createShipment(order, service);
      case 'fastway':
        return await this.fastway.createShipment(order, service);
      case 'pudo':
        return await this.pudo.createDelivery(order, service.lockerId);
      default:
        throw new Error('Invalid courier provider');
    }
  }

  async trackShipment(provider, trackingNumber) {
    switch (provider) {
      case 'courier-guy':
        return await this.courierGuy.trackShipment(trackingNumber);
      case 'fastway':
        return await this.fastway.trackShipment(trackingNumber);
      case 'pudo':
        return await this.pudo.trackDelivery(trackingNumber);
      default:
        throw new Error('Invalid courier provider');
    }
  }
}