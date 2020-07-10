import Video from "../elements/video";

const LargeVideo = ({ data }) => {
  return (
    <section className="container flex flex-col align-middle text-center pt-12 pb-16">
      <h2 className="title mb-6">{data.title}</h2>
      <p className="text-lg mb-10">{data.description}</p>
      {/* Video wrapper */}
      <div className="w-full lg:w-9/12 mx-auto overflow-hidden shadow-2xl">
        <Video
          media={data.video}
          poster={data.poster}
          className="w-full max-h-full"
        />
      </div>
    </section>
  );
};

export default LargeVideo;
