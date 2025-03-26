
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PricingPage = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const plans = [
    {
      name: "Basic",
      description: "For beginners and casual content creators",
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        "Generate up to 10 scripts per month",
        "Basic script templates",
        "Limited platforms (YouTube only)",
        "6-hour chatbot support (weekdays)",
        "Standard script length (up to 3 minutes)"
      ],
      limitations: [
        "No voice output",
        "No thumbnail generation",
        "No AI image suggestions",
        "Basic tones only"
      ],
      ctaText: "Start Free",
      highlight: false
    },
    {
      name: "Pro",
      description: "For serious content creators",
      monthlyPrice: 19,
      annualPrice: 190,
      features: [
        "Generate unlimited scripts",
        "Advanced script templates",
        "All basic platforms",
        "12-hour chatbot support (daily)",
        "Extended script length (up to 15 minutes)",
        "Thumbnail generation"
      ],
      limitations: [
        "No voice output",
        "No AI image suggestions"
      ],
      ctaText: "Upgrade to Pro",
      highlight: true
    },
    {
      name: "Premium",
      description: "For professional content creators",
      monthlyPrice: 39,
      annualPrice: 390,
      features: [
        "Everything in Pro",
        "All platforms supported",
        "24/7 chatbot support",
        "Unlimited script length",
        "Voice output",
        "AI image suggestions",
        "Premium tones",
        "Priority processing"
      ],
      limitations: [],
      ctaText: "Upgrade to Premium",
      highlight: false
    }
  ];

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplyingCoupon(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (couponCode.toUpperCase() === 'SCRIPTFREE') {
        toast.success('Coupon applied: 1 month free trial of Pro plan');
      } else if (couponCode.toUpperCase() === 'SCRIPT50') {
        toast.success('Coupon applied: 50% off your first 3 months');
      } else {
        toast.error('Invalid coupon code');
      }
      setIsApplyingCoupon(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-scriptai-black mb-4">
            Choose the Perfect Plan for Your Needs
          </h1>
          <p className="text-xl text-scriptai-darkgray max-w-3xl mx-auto">
            Select a subscription that fits your content creation workflow, with flexible options for creators at any level.
          </p>
          
          {/* Billing Period Toggle */}
          <div className="mt-8 inline-flex items-center bg-scriptai-lightblue p-1 rounded-lg">
            <button
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-white text-scriptai-blue shadow-sm'
                  : 'text-scriptai-darkgray hover:text-scriptai-black'
              }`}
              onClick={() => setBillingPeriod('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                billingPeriod === 'annual'
                  ? 'bg-white text-scriptai-blue shadow-sm'
                  : 'text-scriptai-darkgray hover:text-scriptai-black'
              }`}
              onClick={() => setBillingPeriod('annual')}
            >
              Annual <span className="text-green-500 text-xs font-normal">Save 20%</span>
            </button>
          </div>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative rounded-xl overflow-hidden ${
                plan.highlight 
                  ? 'shadow-lg border-2 border-scriptai-blue'
                  : 'shadow-sm border border-gray-200'
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-0 right-0 bg-scriptai-blue py-1 text-center text-white text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className={`p-8 ${plan.highlight ? 'pt-10' : ''}`}>
                <h2 className="text-2xl font-bold text-scriptai-black mb-2">{plan.name}</h2>
                <p className="text-scriptai-darkgray mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-scriptai-black">
                    ${billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                  </span>
                  <span className="text-scriptai-darkgray ml-1">
                    /{billingPeriod === 'monthly' ? 'month' : 'year'}
                  </span>
                  
                  {billingPeriod === 'annual' && plan.monthlyPrice > 0 && (
                    <div className="mt-1 text-sm text-green-600">
                      ${Math.round(plan.annualPrice / 12)} per month, billed annually
                    </div>
                  )}
                </div>
                
                <Link to="/register">
                  <Button 
                    className={`w-full py-6 ${
                      plan.highlight 
                        ? 'bg-scriptai-blue hover:bg-blue-600 text-white'
                        : plan.name === 'Basic' 
                        ? 'bg-white border border-scriptai-blue text-scriptai-blue hover:bg-scriptai-lightblue'
                        : 'bg-white border border-gray-200 text-scriptai-darkgray hover:bg-gray-50'
                    }`}
                  >
                    {plan.ctaText}
                  </Button>
                </Link>
                
                <div className="mt-8">
                  <h3 className="font-medium text-scriptai-black mb-4">Features included:</h3>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-scriptai-darkgray">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {plan.limitations.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-medium text-scriptai-black mb-4">Limitations:</h3>
                    <ul className="space-y-3">
                      {plan.limitations.map((limitation, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="h-5 w-5 text-red-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span className="text-sm text-scriptai-darkgray">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Coupon Section */}
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-scriptai-black mb-2">Have a Coupon Code?</h2>
          <p className="text-scriptai-darkgray mb-6">Enter your coupon code to apply discounts to your subscription.</p>
          
          <form onSubmit={handleCouponSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter coupon code"
              className="input-field flex-1"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              required
            />
            <Button 
              type="submit" 
              className="btn-primary"
              disabled={isApplyingCoupon}
            >
              {isApplyingCoupon ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Applying...
                </>
              ) : (
                'Apply Coupon'
              )}
            </Button>
          </form>
          
          <div className="mt-4 text-sm text-gray-600">
            <p>Try these coupon codes in demo mode:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li><code className="bg-gray-100 px-1 py-0.5 rounded">SCRIPTFREE</code> - 1 month free trial of Pro plan</li>
              <li><code className="bg-gray-100 px-1 py-0.5 rounded">SCRIPT50</code> - 50% off your first 3 months</li>
            </ul>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-scriptai-black text-center mb-10">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-scriptai-black mb-2">Can I switch between plans?</h3>
              <p className="text-scriptai-darkgray">Yes, you can upgrade or downgrade your plan at any time. Changes will be applied to your next billing cycle.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-scriptai-black mb-2">Is there a limit to how many scripts I can generate?</h3>
              <p className="text-scriptai-darkgray">The Basic plan allows up to 10 scripts per month. Pro and Premium plans offer unlimited script generation.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-scriptai-black mb-2">What payment methods do you accept?</h3>
              <p className="text-scriptai-darkgray">We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-scriptai-black mb-2">Can I get a refund if I'm not satisfied?</h3>
              <p className="text-scriptai-darkgray">We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
