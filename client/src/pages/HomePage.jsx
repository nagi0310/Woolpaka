import Categories from "../components/Categories";
import MainBanner from "../components/MainBanner";

export default function HomePage() {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32">
      <MainBanner />
      <Categories />
    </div>
  );
}
