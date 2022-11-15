import Border from "components/card/border";
import Description from "components/card/description";
import Image from "components/card/image";
import LayoutPortrait from "components/card/layout-portrait";
import Outer from "components/card/outer";
import Shadow from "components/card/shadow";
import Title from "components/card/title";
import Link from "next/link";
import { Suspense } from "react";
import Recommended from "./recommended";
import RecommendedSkeleton from "./recommended-skeleton";

async function fetchPosts() {
  const res1 = fetch("https://dummyjson.com/posts/1");
  const res2 = fetch("https://dummyjson.com/posts/2");
  const res3 = fetch("https://dummyjson.com/posts/3");
  const res4 = fetch("https://dummyjson.com/posts/4");

  const allRes = await Promise.all([
    res1.then((res) => res.json()),
    res2.then((res) => res.json()),
    res3.then((res) => res.json()),
    res4.then((res) => res.json()),
  ]);

  return allRes;
}

export default async function RootPage() {
  const posts = await fetchPosts();

  return (
    <div className="absolute h-full w-full overflow-y-auto">
      <div className="flex flex-col">
        <div className="border-b border-slate-200 p-4">
          <h1 className="text-4xl font-extrabold text-slate-900">
            The Blog: <span className="text-slate-500">Latest</span>
          </h1>
        </div>
        <ul className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
          {posts.map(({ id, title, body }) => (
            <li key={`posts-${id}`}>
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
          ))}
        </ul>
        <Suspense fallback={<RecommendedSkeleton />}>
          {/* @ts-expect-error Async Server Component */}
          <Recommended />
        </Suspense>
      </div>
    </div>
  );
}
