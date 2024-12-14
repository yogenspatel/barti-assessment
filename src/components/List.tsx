import { FC } from "react"

/**
 * Renders List with title header
 * @returns {JSX.Element}
 */
export const RenderList: FC<{ title: string, data?: string[] }> = ({ title, data = [] }) => {
    if (!data.length) {
      return
    }
    return (
      <div>
        <h4>{title}</h4>
        <ul>
          {data.map(item => <li key={item}>{item}</li>)}
        </ul>
      </div>
    )
  }