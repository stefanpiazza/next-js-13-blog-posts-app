import Border from "components/card/border";
import Description from "components/card/description";
import Image from "components/card/image";
import LayoutPortrait from "components/card/layout-portrait";
import Outer from "components/card/outer";
import Shadow from "components/card/shadow";
import Title from "components/card/title";
import Link from "next/link";
import delay from "../utils/delay";

async function fetchPosts() {
  const res1 = fetch("https://dummyjson.com/posts/5");
  const res2 = fetch("https://dummyjson.com/posts/6");
  const res3 = fetch("https://dummyjson.com/posts/7");
  const res4 = fetch("https://dummyjson.com/posts/8");

  const allRes = await Promise.all([
    res1.then((res) => res.json()),
    res2.then((res) => res.json()),
    res3.then((res) => res.json()),
    res4.then((res) => res.json()),
  ]);

  return allRes;
}

export default async function Recommended() {
  const posts = await fetchPosts();

  await delay(3000);

  return (
    <div className="border-t border-slate-200">
      <ul className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
        {posts.map(({ id, title, body }) => (
          <>
            <li key={`recommended-${id}`}>
              <Outer>
                <Link href={`/posts/${id}`} className="block rounded-lg">
                  <Shadow>
                    <Border>
                      <LayoutPortrait>
                        <Image
                          src={`https://picsum.photos/id/${
                            Math.floor(Math.random() * 10) + 10
                          }/300/300`}
                          alt=""
                        />
                        <Border>
                          <div className="flex flex-col gap-2">
                            {title ? (
                              <div className="line-clamp-1">
                                <Title>{title}</Title>
                              </div>
                            ) : null}
                            {body ? (
                              <div className="line-clamp-3">
                                <Description>{body}</Description>
                              </div>
                            ) : null}
                          </div>
                        </Border>
                      </LayoutPortrait>
                    </Border>
                  </Shadow>
                </Link>
              </Outer>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
}
