import Image from './Image'
import Link from './Link'

const Card = ({ title, description, imgSrc, href }) => (
  <div className="md max-w-[544px] p-6 md:w-1/2 transition hover:rounded-xl hover:scale-105">
    <div
      className={`${
        imgSrc && 'h-full'
      }  overflow-hidden rounded-xl border-2 border-zinc-200 border-opacity-50 dark:border-zinc-700 hover:shadow-xl dark:hover:drop-shadow-lg dark:hover:shadow-zinc-800 hover:bg-zinc-100 hover:dark:bg-zinc-900`}
    >
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        ))}
      <div className="p-6">
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="prose mb-3 max-w-none text-zinc-500 dark:text-zinc-400">{description}</p>
        {href && (
          <Link
            href={href}
            className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Link to ${title}`}
          >
            Learn more &rarr;
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Card
