import { Fragment } from 'react'
import { Link } from 'react-router-dom'

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="mb-5 text-sm text-inksoft" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <Fragment key={item.label}>
            {index > 0 && <li aria-hidden="true">/</li>}
            <li className={item.to ? '' : 'font-semibold text-ink'} aria-current={item.to ? undefined : 'page'}>
              {item.to ? (
                <Link className="transition hover:text-primarydk" to={item.to}>
                  {item.label}
                </Link>
              ) : (
                item.label
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  )
}
