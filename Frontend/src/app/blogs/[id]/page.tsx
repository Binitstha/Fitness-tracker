import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <main className="mx-5 md:mx-10 lg:mx-72 m-5">
      <div>
        <div>
          <h1 className="text-4xl">Title of the post</h1>
          <div className="my-1 w-56 justify-center items-center h-5 flex gap-3">
            <p>Author</p>
            <Separator orientation="vertical" />
            <p>Category</p>
            <Separator orientation="vertical" />
            <p>time</p>
          </div>
        </div>
        <div>
          <div className="relative my-10 rounded-md shadow-lg w-full h-0 pb-[40%] overflow-hidden mx-auto max-w-[800px]">
            <Image
              src={"/1722762471470.jpeg"}
              alt="BlogImage"
              fill
              style={{ objectFit: "cover" }} // Maintain aspect ratio
              className="absolute top-0 left-0 transition-transform duration-300 ease-in-out transform hover:scale-105"
            />
          </div>
          <p className="mt-2 text-center text-gray-500">
            Image caption or description here
          </p>
        </div>
        <div>
          <article className=" mx-10 text-pretty text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
            dolores quod modi facere delectus deserunt ab mollitia, fugiat ex
            cupiditate eveniet reiciendis nisi a et cum veniam dicta nulla odio.
            Tempore tempora ex possimus, corporis error ipsa, quasi qui quod,
            maiores officia accusantium iure! Doloribus amet assumenda magni
            doloremque, reiciendis et, ad aut necessitatibus eos dolor quo
            accusantium porro voluptatibus. Accusamus dignissimos rem suscipit,
            sit reiciendis at sapiente eum ratione quis repudiandae maiores
            praesentium! Quas placeat aspernatur, molestiae nisi ullam optio
            dolorum eligendi deserunt, nesciunt corrupti facere autem fuga.
            Nobis! Assumenda illo fuga ut sint, provident, corrupti labore quam
            quae doloremque vel totam omnis unde reprehenderit. Porro debitis,
            voluptas temporibus animi ab quas. Cupiditate eaque consequatur
            illum esse animi harum? Aliquam, explicabo, illo atque architecto
            sunt expedita provident impedit beatae recusandae itaque, enim
            voluptatibus similique neque consequuntur dicta quod sint deserunt
            ea eveniet. Modi quae laborum dolores ea similique excepturi.
            Obcaecati fuga dolorum, quidem voluptatem omnis molestias et tenetur
            repellendus numquam voluptates doloremque, officia adipisci aperiam
            error quo eum ex laboriosam voluptate sint odit suscipit! Est
            voluptates totam pariatur corrupti. Culpa explicabo repudiandae
            ullam? A voluptatem adipisci excepturi quisquam commodi? Soluta,
            placeat. Similique quisquam rem accusantium sint aliquam libero
            harum voluptas officiis, veritatis aperiam, voluptate, assumenda
            vero distinctio iure iusto. Quod quam rem a mollitia illo aut iste
            est nulla, consequatur soluta esse iusto aspernatur laboriosam quo
            animi voluptas assumenda consectetur quia laborum ab repellat culpa
            magni voluptatum! Quisquam, numquam. Facere, sapiente. Voluptatibus
            et autem ullam quia sequi ipsam odio perferendis, consequuntur
            nobis, quisquam facere ad vitae excepturi. Eveniet ipsa perferendis
            itaque vel, optio cupiditate. Sint itaque praesentium magni ex.
            Sapiente eligendi laudantium maxime id ab. Repudiandae eaque
            asperiores iure voluptatem inventore qui at, voluptate velit quia
            quisquam? Tenetur corporis eligendi rerum numquam, cupiditate illo
            aperiam pariatur sit labore natus!
          </article>
        </div>
      </div>
    </main>
  );
};

export default Page;
