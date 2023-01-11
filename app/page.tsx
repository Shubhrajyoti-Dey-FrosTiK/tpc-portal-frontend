import dynamic from "next/dynamic";

import DemoSchema from "../demo/DemoSchema";

const Form = dynamic(() => import("../components/form/Form"), {
  loading: () => <h1>Loading</h1>,
});

export default function Home() {
  return (
    <main>
      <Form schema={DemoSchema} />
    </main>
  );
}
