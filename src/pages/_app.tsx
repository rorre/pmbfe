import { Outlet } from "react-router-dom";
import { Modals } from "@generouted/react-router";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { Provider } from "jotai";
import { defaultStore } from "../atoms";

export default function App() {
  return (
    <Provider store={defaultStore}>
      <section className="bg-[#f8f8f8] min-h-screen w-full">
        <Navbar />

        <main>
          <Outlet />
        </main>

        <Modals />
        <Toaster />
      </section>
    </Provider>
  );
}
