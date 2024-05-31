const Error = () => {
  return (
    <div className=" h-[90vh] px-96 max-md:px-10 flex justify-center flex-col gap-3">
      <h1 className="text-red-600 text-9xl ">404</h1>
      <span className="text-red-600 text-4xl font-bold tracking-wider">
        UH OH! You{"'"}re lost.
      </span>
      <span className="text-md font-medium">
        The page you are looking for does not exist. How you got here is a
        mystery. But you can click the link below to go back to the{" "}
        <a href="/" className="text-lg font-bold hover:underline"> homepage.</a>
      </span>
    </div>
  );
};

export default Error;
