import { Link } from "react-router-dom";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$49/mo",
      description: "Perfect for small property owners.",
      features: ["Up to 5 Properties", "Basic Analytics", "Email Support"],
    },
    {
      name: "Business",
      price: "$129/mo",
      description: "For growing real estate professionals.",
      features: [
        "Up to 20 Properties",
        "Advanced Analytics",
        "Priority Support",
        "Automated Payments",
      ],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom Pricing",
      description: "Enterprise solutions for large property firms.",
      features: [
        "Unlimited Properties",
        "Dedicated Account Manager",
        "API Access",
        "24/7 Priority Support",
      ],
    },
  ];

  return (
    <section className="py-20 bg-gray-900 text-white text-center">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-6">Pricing Plans</h2>
        <p className="text-lg text-gray-400 mb-12">
          Choose the best plan for your business needs.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-8 rounded-xl border border-gray-700 shadow-lg transition-transform transform hover:scale-105 
              ${plan.highlight ? "bg-blue-600 text-white border-blue-500" : "bg-gray-800"}`}
            >
              <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-2">{plan.price}</p>
              <p className="text-gray-300 mb-6">{plan.description}</p>
              <ul className="text-left space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-200">
                    ✅ <span className="ml-2">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/pricing"
                className={`block py-3 rounded-md font-bold text-center transition 
                ${plan.highlight ? "bg-white text-blue-600 hover:bg-gray-200" : "bg-blue-500 text-white hover:bg-blue-700"}`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
