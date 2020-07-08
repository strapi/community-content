import ButtonLink from "@/components/button-link";

const BottomActions = ({ data }) => {
  return (
    <section className="bg-primaryDark py-20 text-center -mt-32 first:-mt-0">
      <h2 className="title text-white mb-10">{data.title}</h2>
      {/* Buttons row */}
      <div className="container flex flex-row justify-center flex-wrap gap-4">
        {data.buttons.map((button) => (
          <ButtonLink button={button} key={button.id} />
        ))}
      </div>
    </section>
  );
};

export default BottomActions;
