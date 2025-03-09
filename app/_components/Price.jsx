import React from 'react';
import Pricing from '../../components/ui/pricing';
const Price = () => {
  return (
    <>
      <h1 className="text-4xl font-extrabold text-center mb-6 text-white">Pricing</h1> {/* Added color for dark theme */}
      <div className="flex justify-center items-center ">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-4">Choose Your Plan</h2>
          <div className="flex justify-center">
            <Pricing
              outerRadius="moreRounded"
              padding="large"
              plans={[
                {
                  monthlyPrice: '$4.99',
                  name: 'Basic',
                  yearlyPrice: '$49.99'
                },
                {
                  monthlyPrice: '$14.99',
                  name: 'Standard',
                  popular: true,
                  yearlyPrice: '$149.99'
                },
                {
                  monthlyPrice: '$24.99',
                  name: 'Premium',
                  yearlyPrice: '$249.99'
                },
                {
                  monthlyPrice: '$49.99',
                  name: 'Enterprise',
                  yearlyPrice: '$499.99'
                }
              ]}
              width="xl"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Price;