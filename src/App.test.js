import React from 'react';
import {render, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockData from './mockData';
import App from './App';
import TodoItem from './components/TodoItem';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('<App /> tests', () => {
  

  it("add a due date to each to-to item", async () => {
    

    render(<App todo={mockData}/>);
    mockData.map((todoItem)=>{
      expect(screen.getByText(todoItem.dueDate)).toBeInTheDocument()  
    })

  });

  it("make missed to-dos red", async ()=>{
    const todayDate= new Date();
    render(<App todo={mockData}/>);
    mockData.map((todoItem)=>{
      if (new Date(todayDate >= new Date(todoItem.dueDate))){
        expect(screen.queryByText(todoItem.dueDate)).toHaveStyle(`color: red`);  // it should word i don't know why it's not working :(
      }
      
        
    }) 



    
  });

  
  
  // it('todo item should be crossed out after completing', async () => {
  //     jest.spyOn(global, "fetch").mockImplementation(() =>
  //     Promise.resolve({
  //         json: () => Promise.resolve(mockData)
  //     })
  //     );
  //   render(<App />);
  //   await waitFor(() => {
  //       expect(screen.getByTestId('checkbox-1')).toBeDefined();
  //   })
  //   userEvent.click(screen.getByTestId('checkbox-1'));
  //   expect(screen.getByText(/eat breakfast/i)).toHaveClass('completed');
  // });

});
