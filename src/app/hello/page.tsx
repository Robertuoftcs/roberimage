export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  //throw new Error("Oops! Something went wrong.");
  return (
    <div>
      <h1>Hello, world!</h1>
    </div>
  );
}