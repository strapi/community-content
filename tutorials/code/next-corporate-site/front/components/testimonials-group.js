const TestimonialsGroup = ({ data }) => {
  return (
    <section>
      <h2 className="title mb-4">{data.title}</h2>
      <p className="bg-gray-700">{data.description}</p>
    </section>
  );
};

export default TestimonialsGroup;
