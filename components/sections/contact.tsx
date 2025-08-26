import { useState, ChangeEvent, FormEvent, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Linkedin, Github } from "lucide-react";

// EmailJS environment variables
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface SocialLink {
  network: string;
  href: string;
}

interface SocialData {
  social: SocialLink[];
}

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [socialData, setSocialData] = useState<SocialData | null>(null);
  const [loading, setLoading] = useState(true);
  const [emailAddress, setEmailAddress] = useState("");

  useEffect(() => {
    // Initialize EmailJS with public key from env
    emailjs.init(EMAILJS_PUBLIC_KEY);
    async function fetchSocialData() {
      try {
        const response = await fetch('/profile/social.json');
        const data = await response.json();
        setSocialData(data);
        
        // Extract email from social data
        const emailLink = data.social.find((item: SocialLink) => item.network === 'email');
        if (emailLink) {
          setEmailAddress(emailLink.href.replace('mailto:', ''));
        }
      } catch (error) {
        console.error('Error loading social data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSocialData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      .then(
        () => {
          alert('Message sent successfully!');
          setFormData({ name: '', email: '', subject: '', message: '' });
        },
        (error) => {
          console.error('EmailJS Error:', error);
          alert('Failed to send message, please try again later.');
        }
      );
  };

  const getSocialIcon = (network: string) => {
    switch (network) {
      case 'linkedin':
        return <Linkedin className="h-6 w-6" />;
      case 'github':
        return <Github className="h-6 w-6" />;
      case 'email':
        return <Mail className="h-6 w-6" />;
      default:
        return null;
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container px-4 md:px-6 mx-auto flex flex-col items-center">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 md:text-4xl">Get In Touch</h2>
        
        {!loading && socialData && (
          <div className="flex justify-center gap-6 mb-12">
            {socialData.social.map((item, index) => (
              <a 
                key={index}
                href={item.href}
                target={item.network !== 'email' ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label={item.network}
              >
                {getSocialIcon(item.network)}
              </a>
            ))}
          </div>
        )}
        
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl w-full">
          <Card className="pt-4">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                <a href={`mailto:${emailAddress}`} className="hover:underline">
                  {emailAddress || 'your.email@example.com'}
                </a>
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="pt-4">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                San Jose, California
              </CardDescription>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mt-12 max-w-4xl w-full pt-4">
          <CardHeader>
            <CardTitle>Send Me a Message</CardTitle>
            <CardDescription>
              Feel free to reach out if you have any questions or just want to say hello!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <Input 
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea 
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full md:w-auto">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;