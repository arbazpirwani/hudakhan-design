import { Metadata } from 'next';
import Text from '@/src/presentation/components/atoms/Text';
import Button from '@/src/presentation/components/atoms/Button';
import Icon from '@/src/presentation/components/atoms/Icon';

export const metadata: Metadata = {
  title: 'Privacy Policy - Huda Khan Portfolio',
  description: 'Privacy policy for Huda Khan\'s portfolio website.',
};

export default function PrivacyPage() {
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
            Privacy Policy
          </Text>
          
          <div className="prose prose-invert max-w-none">
            <Text variant="body" color="secondary" className="mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </Text>

            <div className="space-y-8">
              <div>
                <Text variant="h3" weight="semibold" className="mb-4">
                  Information We Collect
                </Text>
                <Text variant="body" color="secondary" className="mb-4">
                  This portfolio website collects minimal information to provide the best user experience:
                </Text>
                <ul className="list-disc list-inside space-y-2 text-dynamic-text-secondary">
                  <li>Contact form submissions (name, email, message)</li>
                  <li>Basic analytics data (page views, session duration)</li>
                  <li>Technical information (browser type, device information)</li>
                </ul>
              </div>

              <div>
                <Text variant="h3" weight="semibold" className="mb-4">
                  How We Use Your Information
                </Text>
                <Text variant="body" color="secondary" className="mb-4">
                  Information collected is used solely for:
                </Text>
                <ul className="list-disc list-inside space-y-2 text-dynamic-text-secondary">
                  <li>Responding to your inquiries and project requests</li>
                  <li>Improving website performance and user experience</li>
                  <li>Understanding visitor behavior through analytics</li>
                </ul>
              </div>

              <div>
                <Text variant="h3" weight="semibold" className="mb-4">
                  Data Protection
                </Text>
                <Text variant="body" color="secondary">
                  Your personal information is protected using industry-standard security measures. 
                  We do not sell, trade, or share your personal information with third parties 
                  without your explicit consent.
                </Text>
              </div>

              <div>
                <Text variant="h3" weight="semibold" className="mb-4">
                  Contact
                </Text>
                <Text variant="body" color="secondary">
                  If you have questions about this privacy policy, please contact me at 
                  hudapervez@hotmail.com.
                </Text>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-dynamic-border">
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