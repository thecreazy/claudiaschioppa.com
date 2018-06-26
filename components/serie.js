import { string } from 'prop-types'
import Link from 'next/link'

const Serie = ({color, title, slug}) => (
    <Link prefetch href={`serie/${slug}`}>
  <section className="serie">
    <h3 className="serie__name" style={{
      color: `${color}`
    }}>{title}</h3>
    <div className="serie__images">
     <img className="serie__image" src="https://picsum.photos/200/300" />
     <img className="serie__image" src="https://picsum.photos/400/300" />
     <img className="serie__image" src="https://picsum.photos/200/300" />
     </div>
      <style jsx>
      {`
        .serie{
            min-height: 120px;
            margin: 10px;
            margin-bottom: 70px;
            margin-top: 20px;
            padding: 0 15px;
            display:flex;
            flex-direction: column;
            cursor: pointer;
        }
        .serie .serie__name{
            margin: 0px
            margin-top: 20px;
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 0.5em;
            text-align: center;
            font-size: 5rem;
            margin-bottom: 1.25rem;
            text-transform: capitalize;
        }
        .serie .serie__images{
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            overflow: hidden;
            flex-flow: row wrap;
            padding-top: 10px;
        }
        .serie .serie__image {
            margin: 5px;
            width: 30%;
            height: 100%;
            transition: filter 1s;
        }
        .serie .serie__image:hover{
            filter: grayscale(100%)
        }
        }
      `}
      </style>
  </section>
  </Link>
)

Serie.propTypes = {
  color: string,
  images: string,
  title: string,
  slug: string
}

export default Serie
