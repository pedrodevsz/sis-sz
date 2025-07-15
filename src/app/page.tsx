import FormAddProducts from "@/components/formAddProducts/FormAddProducts";
import { Header } from "@/components/header/Header";
import ListAllProducts from "@/components/listAllProducts/ListAllProducts";

export default function Home() {
  return (
    <main>
      <Header />
      <FormAddProducts />
      <ListAllProducts />
    </main>
  );
}
