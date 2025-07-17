import { Header } from "@/components/header/Header";
import { TodayList } from "@/components/listSalesToday/SalesToday";

export default function Page() {
  return (
    <>
      <Header />
      <header>
        <TodayList />
      </header>
    </>
  )
}
