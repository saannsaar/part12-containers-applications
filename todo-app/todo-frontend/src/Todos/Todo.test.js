import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import Todo from './Todo'

describe('Todo', () => {
    const newTodo = {
        text: 'Todo testi',
        done: false
    }

    const onClickDone = jest.fn()
    const onClickDelete = jest.fn()

    const doneInfo = (
        <>
      <span>This todo is done</span>
      <span>
        <button onClick={() => onClickDelete(todo)}> Delete </button>
      </span>
    </>
    )

    const notDoneInfo = (
        <>
            <span>
              This todo is not done
            </span>
            <span>
              <button onClick={onClickDelete(todo)}> Delete </button>
              <button onClick={onClickDone(todo)}> Set as done </button>
            </span>
          </>
    )

    const user = userEvent.setup()
    test('todo is rendered correctly', () => {
       render(
        <Todo todo={todo} doneInfo={doneInfo} notDoneInfo={notDoneInfo}/>
       )
    })

    expect(screen.getByText(todo.text)).toBeInTheDocument()
    expect(screen.getByText('This todo is not node')).toBeInTheDocument()

    text('Set as done button is called', async () => {
        render(
            <Todo todo={todo} doneInfo={doneInfo} notDoneInfo={notDoneInfo}/>
           )

           const button = screen.getByText(/Set as done/)

           await user.click(button)
           expect(onClickDone).toHaveBeenCalled()
    })

})