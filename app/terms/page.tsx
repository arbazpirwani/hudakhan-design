import { Metadata } from 'next';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';

export const metadata: Metadata = {
  title: 'Terms of Service - Huda Khan Portfolio',
  description: 'Terms of service for Huda Khan\'s portfolio website.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <section className="section-padding pt-32">
        <div className="container-custom max-w-4xl">
          <Text
            variant="overline"
            color="accent"
            className="mb-4"
          >
            Legal
          </Text>
          <Text
            variant="h1"
            weight="bold"
            className="mb-8 leading-tight"
          >
            Terms of Service
          </Text>
          
          <div className="prose prose-invert max-w-none">
            <Text variant="body" color="secondary" className="mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </Text>

            <div className="space-y-8">
              <div>
                <Text variant="h3" weight="semibold" className="mb-4">
                  Acceptance of Terms
                </Text>
                <Text variant="body" color="secondary">
                  By accessing and using this portfolio website, you accept and agree to be bound by 
                  the terms and provision of this agreement.
                </Text>
              </div>

              <div>
                <Text variant="h3" weight="semibold" className="mb-4">
                  Intellectual Property
                </Text>
                <Text variant="body" color="secondary" className="mb-4">
                  All content, designs, and creative work displayed on this website are protected by copyright:
                </Text>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Portfolio work remains property of respective clients or Huda Khan</li>
                  <li>Website design and code are proprietary</li>
                  <li>Content may not be reproduced without permission</li>
                </ul>
              </div>

              <div>
                <Text variant="h3" weight="semibold" className="mb-4">
                  Professional Services
                </Text>
                <Text variant="body" color="secondary">
                  This website serves as a professional portfolio. Any project inquiries or business 
                  discussions initiated through this platform are subject to separate contractual 
                  agreements and terms.
                </Text>
              </div>

              <div>
                <Text variant="h3" weight="semibold" className="mb-4">
                  Limitation of Liability
                </Text>
                <Text variant="body" color="secondary">
                  This website is provided "as is" without warranties. Huda Khan shall not be liable 
                  for any direct, indirect, incidental, or consequential damages arising from the use 
                  of this website.
                </Text>
              </div>

              <div>
                <Text variant="h3" weight="semibold" className="mb-4">
                  Contact
                </Text>
                <Text variant="body" color="secondary">
                  For questions about these terms, please contact me at hudapervez@hotmail.com.
                </Text>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-800">
              <Button
                variant="secondary"
                href="/"
                icon={<Icon name="arrow-left" size={20} />}
                iconPosition="left"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}