import '@testing-library/jest-dom'; // Correct way to import jest-dom
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
  
    test('shows URL and number of likes when the "Show details" button is clicked', async () => {
      render(<Blog blog={blog} />);
  
      // Verify the details are not shown by default
      expect(screen.queryByText(blog.url)).not.toBeInTheDocument();
      expect(screen.queryByText(`Likes: ${blog.likes}`)).not.toBeInTheDocument();
  
      // Simulate clicking the "Show details" button
      const button = screen.getByRole('button', { name: /show details/i });
      await userEvent.click(button);
  
      // Verify the URL and likes are displayed after clicking the button
      expect(screen.getByText(blog.url)).toBeInTheDocument();
      expect(screen.getByText(`Likes: ${blog.likes}`)).toBeInTheDocument();
    });
});