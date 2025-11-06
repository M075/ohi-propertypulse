"use client";
import React, { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";

const ProfileForm = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  // Add this
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    username: profileName || "",
    email: profileEmail || "",
    bio: "",
    urls: ["https://shadcn.com", "http://twitter.com/shadcn"],
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (formData.username.length < 2) {
      newErrors.username = "Username must be at least 2 characters.";
    } else if (formData.username.length > 30) {
      newErrors.username = "Username must not be longer than 30 characters.";
    }

    if (!formData.email) {
      newErrors.email = "Please select an email to display.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (formData.bio.length < 4) {
      newErrors.bio = "Bio must be at least 4 characters.";
    } else if (formData.bio.length > 160) {
      newErrors.bio = "Bio must not exceed 160 characters.";
    }

    formData.urls.forEach((url, index) => {
      try {
        new URL(url);
      } catch {
        if (url) {
          newErrors[`url${index}`] = "Please enter a valid URL.";
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmitted(true);
      // You would typically send this data to an API here
      console.log("Form submitted:", formData);
    }
  };

  const handleInputChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
    setSubmitted(false);
  };

  const handleUrlChange = (e, index) => {
    const newUrls = [...formData.urls];
    newUrls[index] = e.target.value;
    setFormData({
      ...formData,
      urls: newUrls,
    });
    setSubmitted(false);
  };

  const addUrl = () => {
    setFormData({
      ...formData,
      urls: [...formData.urls, ""],
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6" data-oid=":k4o:w1">
      <form onSubmit={handleSubmit} className="space-y-8" data-oid="3-ydgu0">
        <div data-oid="dtsdo9q">
          <label className="block text-sm font-medium mb-1" data-oid="me1:nf1">
            Username
          </label>
          <Input
            // placeholder={session?.user?.name || 'Username'}
            value={formData.username}
            onChange={(e) => handleInputChange(e, "username")}
            data-oid="xruvibh"
          />

          {errors.username && (
            <p className="text-sm text-red-500 mt-1" data-oid="6qzrn62">
              {errors.username}
            </p>
          )}
          <p className="text-sm text-gray-500 mt-1" data-oid="_1wkho_">
            This is your public display name. It can be your real name or a
            pseudonym. You can only change this once every 30 days.
          </p>
        </div>

        <div data-oid="73a2peq">
          <label className="block text-sm font-medium mb-1" data-oid="wdh7i_7">
            Email
          </label>
          <Input
            // placeholder={session?.user?.name || 'Username'}
            value={formData.email}
            onChange={(e) => handleInputChange(e, "username")}
            data-oid="gw:9n7v"
          />

          {errors.email && (
            <p className="text-sm text-red-500 mt-1" data-oid="86yi788">
              {errors.email}
            </p>
          )}
          <p className="text-sm text-gray-500 mt-1" data-oid="_v:uug3">
            You can manage verified email addresses in your email settings.
          </p>
        </div>

        <div data-oid="o9iufcu">
          <label className="block text-sm font-medium mb-1" data-oid="0v22oat">
            Bio
          </label>
          <Textarea
            placeholder="Tell us a little bit about yourself"
            className="resize-none"
            value={formData.bio}
            onChange={(e) => handleInputChange(e, "bio")}
            data-oid="14tgx47"
          />

          {errors.bio && (
            <p className="text-sm text-red-500 mt-1" data-oid="m.o4_49">
              {errors.bio}
            </p>
          )}
          <p className="text-sm text-gray-500 mt-1" data-oid="bsztvlp">
            You can @mention other users and organizations to link to them.
          </p>
        </div>

        <div data-oid="xf0u1rk">
          <label className="block text-sm font-medium mb-1" data-oid="tf_z:ql">
            URLs
          </label>
          {formData.urls.map((url, index) => (
            <div key={index} className="mt-2" data-oid=".m2kcll">
              <Input
                value={url}
                onChange={(e) => handleUrlChange(e, index)}
                placeholder="https://example.com"
                data-oid="53ann9n"
              />

              {errors[`url${index}`] && (
                <p className="text-sm text-red-500 mt-1" data-oid="refwzsh">
                  {errors[`url${index}`]}
                </p>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={addUrl}
            data-oid="ic-phls"
          >
            Add URL
          </Button>
        </div>

        <Button type="submit" data-oid="p2:ourd">
          Update profile
        </Button>

        {submitted && (
          <Alert className="mt-4" data-oid="8wwjs1h">
            <AlertDescription data-oid="3iv:k55">
              <pre
                className="mt-2 w-full rounded-md bg-slate-950 p-4"
                data-oid="tgi8a9b"
              >
                <code className="text-white" data-oid="eb0nb4x">
                  {JSON.stringify(formData, null, 2)}
                </code>
              </pre>
            </AlertDescription>
          </Alert>
        )}
      </form>
    </div>
  );
};

export default ProfileForm;
