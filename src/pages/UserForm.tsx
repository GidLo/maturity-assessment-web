
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useAssessment } from '@/context/AssessmentContext';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { ChevronRight } from 'lucide-react';
import { UserFormData } from '@/types/assessment';

const formSchema = z.object({
  industry: z.string({
    required_error: "Please select an industry",
  }),
  companyName: z.string().min(1, {
    message: "Company name is required",
  }),
  role: z.string().min(1, {
    message: "Your role is required",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const industries = [
  "Aerospace & Defense",
  "Agriculture",
  "Automotive",
  "Banking & Financial Services",
  "Chemical",
  "Construction & Engineering",
  "Consumer Goods",
  "Education",
  "Energy & Utilities",
  "Food & Beverage",
  "Government",
  "Healthcare",
  "Hospitality & Tourism",
  "Information Technology",
  "Insurance",
  "Manufacturing",
  "Media & Entertainment",
  "Mining & Metals",
  "Pharmaceutical",
  "Professional Services",
  "Real Estate",
  "Retail",
  "Telecommunications",
  "Transportation & Logistics",
  "Other"
];

const UserForm = () => {
  const navigate = useNavigate();
  const { setUserFormData } = useAssessment();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industry: "",
      companyName: "",
      role: "",
    },
  });

  function onSubmit(data: FormValues) {
    // Ensure all required fields are present before saving to context
    const userFormData: UserFormData = {
      industry: data.industry,
      companyName: data.companyName,
      role: data.role,
    };
    
    // Save form data to context
    setUserFormData(userFormData);
    
    console.log("Form data:", data);
    
    // Show success toast
    toast({
      title: "Information saved",
      description: "Your details have been saved. Starting the assessment now.",
    });
    
    // Navigate to assessment page after a brief delay
    setTimeout(() => {
      navigate('/assessment');
    }, 1000);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 pb-16">
        <section className="py-12 md:py-20">
          <div className="container max-w-2xl px-4 md:px-6">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center space-y-4">
                <h1 className="text-3xl md:text-4xl font-medium tracking-tight">Before You Begin</h1>
                <p className="text-lg text-muted-foreground">
                  Please provide some information about yourself to help us tailor the assessment experience.
                </p>
              </div>
              
              <div className="bg-card rounded-xl shadow-sm border p-6 md:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select your Industry</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an industry" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {industries.map((industry) => (
                                <SelectItem key={industry} value={industry}>
                                  {industry}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose the industry that best describes your organization.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your company name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Role</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your role or position" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-4 flex justify-center">
                      <Button
                        type="submit"
                        className="inline-flex items-center px-6 py-3 rounded-full bg-[#db536a] hover:bg-[#db536a]/90 text-white font-medium"
                      >
                        Continue to Assessment
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default UserForm;
