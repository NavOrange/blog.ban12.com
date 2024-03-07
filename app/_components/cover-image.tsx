import Image from 'next/image'
import Link from 'next/link'

import { cn } from '#/lib/utils'

type Props = {
  title: string
  src: string
  slug?: string
}

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn('w-full shadow-sm aspect-[2/1]', {
        'transition-shadow duration-200 hover:shadow-lg': slug,
      })}
      width={1300}
      height={650}
    />
  )
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

export default CoverImage
