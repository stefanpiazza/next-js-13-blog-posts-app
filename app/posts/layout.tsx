import Link from "next/link";
import Border from "components/card/border";
import Description from "components/card/description";
import Image from "components/card/image";
import LayoutLandscape from "components/card/layout-landscape";
import Shadow from "components/card/shadow";
import Title from "components/card/title";
import Outer from "components/card/outer";

async function fetchPosts() {
  const res = await fetch("https://dummyjson.com/posts");

  return res.json();
}

export default async function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { posts } = await fetchPosts();

  return (
    <div className="absolute h-full w-full overflow-hidden">
      <div className="flex h-full w-full flex-col">
        <div className="border-b border-slate-200 p-4">
          <h1 className="text-4xl font-extrabold text-slate-900">
            The Blog: <span className="text-slate-500">Posts</span>
          </h1>
        </div>
        <div className="grid h-full w-full grid-cols-1 grid-rows-[1fr_auto] overflow-hidden md:grid-cols-[2fr_3fr]">
          <ul
            className="row-start-2 grid snap-x snap-mandatory auto-cols-[90%] grid-flow-col gap-4 overflow-auto border-t border-slate-200 p-4 md:row-start-1 md:auto-cols-[100%] md:grid-flow-row"
            tabIndex={-1}
          >
            {posts.map(
              ({
                id,
                title,
                body,
              }: {
                id: number;
                title: string;
                body: string;
              }) => (
                <li key={`posts-${id}`} className="snap-center">
                  <Outer path="posts/" id={id}>
                    <Link href={`posts/${id}`} className="block rounded-lg">
                      <Shadow>
                        <Border>
                          <LayoutLandscape>
                            <Image
                              src={`https://picsum.photos/id/${
                                Math.floor(Math.random() * 10) + 10
                              }/300/300`}
                              alt=""
                            />
                            <Border>
                              <div className="flex flex-col">
                                {title ? (
                                  <div className="line-clamp-1">
                                    <Title>{title}</Title>
                                  </div>
                                ) : null}
                                {body ? (
                                  <div className="line-clamp-1">
                                    <Description>{body}</Description>
                                  </div>
                                ) : null}
                              </div>
                            </Border>
                          </LayoutLandscape>
                        </Border>
                      </Shadow>
                    </Link>
                  </Outer>
                </li>
              )
            )}
          </ul>
          <div className="grid h-full w-full gap-4 overflow-y-auto p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
