import { MdCheckBox } from "react-icons/md";
import classNames from "classnames";

const Pricing = ({ data }) => {
  return (
    <div className="container py-12">
      <h1 className="text-4xl text-center">{data.title}</h1>
      <div className="flex flex-col lg:flex-row gap-4 lg:justify-center mt-6">
        {data.plans.map((plan) => (
          <div
            className={classNames(
              // Common classes
              "rounded-md border-2 py-4 px-4 flex-1 md:w-lg",
              // Normal plan
              {
                "bg-gray-100 text-gray-900 border-gray-300": !plan.isRecommended,
              },
              // Recommended plan
              {
                "bg-primary-100 text-primary-900 border-primary-300":
                  plan.isRecommended,
              }
            )}
            key={plan.id}
          >
            <h2 className="text-2xl">{plan.name}</h2>
            <p
              className={classNames("mt-4 text-lg", {
                "text-primary-700": plan.isRecommended,
                "text-gray-700": !plan.isRecommended,
              })}
            >
              {plan.description}
            </p>
            <p className="text-3xl mt-4">
              {plan.price === 0 ? "Free " : `$${plan.price} `}
              <span className="text-base font-medium">{plan.pricePeriod}</span>
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {plan.features.map((feature) => (
                <li
                  className="flex flex-row justify-between items-center"
                  key={feature.id}
                >
                  <span>{feature.name}</span>
                  <MdCheckBox className="h-6 w-auto text-gray-900" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
