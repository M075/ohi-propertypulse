import connectDB from '@/config/database';
import User from '@/models/User';
import Product from '@/models/Product';
import Order from '@/models/Order';
import { getSessionUser } from '@/utils/getSessionUser';

// app/api/admin/users/[userId]/route.js
export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser?.userId) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const admin = await User.findById(sessionUser.userId);
    if (!admin?.isAdmin) {
      return new Response(
        JSON.stringify({ error: 'Forbidden' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { userId } = await params;
    const { action } = await request.json();

    const user = await User.findById(userId);
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    switch (action) {
      case 'suspend':
        user.isActive = false;
        break;
      case 'activate':
        user.isActive = true;
        break;
      case 'delete':
        await User.findByIdAndDelete(userId);
        return new Response(
          JSON.stringify({ message: 'User deleted' }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    await user.save();

    return new Response(
      JSON.stringify({ user }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Admin user action error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}