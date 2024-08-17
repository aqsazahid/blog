import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../src/components/Blog';

describe('<Blog />', () => {
    const blog = {
      title: 'Test Blog Title',
      author: 'Test Author',
      url: 'http://testurl.com',
      likes: 5,
    };
  
    test('calls the event handler twice when the like button is clicked twice', async () => {
      const mockHandler = jest.fn();
  
      render(<Blog blog={blog} handleLike ={mockHandler} />);
  
      // Show the details first so that the like button is rendered
      const showButton = screen.getByRole('button', { name: /show details/i });
      await userEvent.click(showButton);
  
      // Get the like button
      const likeButton = screen.getByRole('button', { name: /like/i });
  
      // Simulate two clicks
      await userEvent.click(likeButton);
      await userEvent.click(likeButton);
  
      // Ensure the handler was called twice
      expect(mockHandler).toHaveBeenCalledTimes(2);
    });
});