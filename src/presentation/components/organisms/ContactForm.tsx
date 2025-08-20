'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Text from '@/presentation/components/atoms/Text';
import Button from '@/presentation/components/atoms/Button';
import Input from '@/presentation/components/atoms/Input';
import Textarea from '@/presentation/components/atoms/Textarea';
import Select from '@/presentation/components/atoms/Select';
import Icon from '@/presentation/components/atoms/Icon';
import { 
  contactFormSchema, 
  ContactFormData, 
  projectTypes, 
  budgetRanges, 
  timelines 
} from '@/presentation/utils/validation';

interface ContactFormProps {
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ className = '' }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', data);
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "backOut" }}
        className={`card text-center ${className}`}
      >
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="heart" size={32} color="white" />
        </div>
        <Text variant="h3" weight="semibold" className="mb-4">
          Thank You!
        </Text>
        <Text variant="body" color="secondary" className="mb-6">
          Your message has been sent successfully. I'll get back to you within 24 hours.
        </Text>
        <Button
          variant="secondary"
          onClick={() => setIsSubmitted(false)}
        >
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.form
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit(onSubmit)}
      className={`card ${className}`}
    >
      <Text variant="h3" weight="semibold" className="mb-8">
        Let's Work Together
      </Text>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <motion.div variants={itemVariants}>
          <Input
            {...register('name')}
            label="Full Name"
            placeholder="Your name"
            required
            error={errors.name?.message}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            {...register('email')}
            type="email"
            label="Email Address"
            placeholder="your@email.com"
            required
            error={errors.email?.message}
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <motion.div variants={itemVariants}>
          <Input
            {...register('company')}
            label="Company (Optional)"
            placeholder="Your company name"
            error={errors.company?.message}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            {...register('website')}
            type="url"
            label="Website (Optional)"
            placeholder="https://yourwebsite.com"
            error={errors.website?.message}
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <motion.div variants={itemVariants}>
          <Select
            {...register('projectType')}
            label="Project Type"
            options={projectTypes}
            placeholder="Select project type"
            required
            error={errors.projectType?.message}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Select
            {...register('budget')}
            label="Budget Range"
            options={budgetRanges}
            placeholder="Select budget"
            required
            error={errors.budget?.message}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Select
            {...register('timeline')}
            label="Timeline"
            options={timelines}
            placeholder="Select timeline"
            required
            error={errors.timeline?.message}
          />
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="mb-8">
        <Textarea
          {...register('message')}
          label="Project Details"
          placeholder="Tell me about your project, goals, and any specific requirements..."
          rows={6}
          required
          error={errors.message?.message}
        />
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting || !isValid}
          className="flex-1"
          icon={
            isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Icon name="mail" size={20} />
            )
          }
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={() => reset()}
          disabled={isSubmitting}
          icon={<Icon name="x" size={20} />}
        >
          Clear Form
        </Button>
      </motion.div>

      {/* Form status */}
      <motion.div
        variants={itemVariants}
        className="mt-6 p-4 bg-dynamic-accent/10 border border-dynamic-accent/20 rounded-xl"
      >
        <div className="flex items-start gap-3">
          <Icon name="zap" size={20} color="rgb(147, 51, 234)" />
          <div>
            <Text variant="caption" weight="medium" className="text-dynamic-accent mb-1">
              Quick Response Guaranteed
            </Text>
            <Text variant="caption" color="secondary">
              I typically respond to all inquiries within 24 hours. For urgent projects, 
              you can also reach me directly at hudapervez@hotmail.com.
            </Text>
          </div>
        </div>
      </motion.div>
    </motion.form>
  );
};

export default ContactForm;