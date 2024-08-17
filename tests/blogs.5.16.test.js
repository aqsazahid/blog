import '@testing-library/jest-dom'; 
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from '../src/components/BlogForm';

describe('<BlogForm />', () => {
    test('calls the event handler with the right details when a new blog is created', async () => {
      const createBlog = jest.fn(); 
  
      render(<BlogForm createBlog={createBlog} />);
  
      const blogDetails = {
        title: 'Testing React Forms',
        author: 'Jane Doe',
        url: 'http://testurl.com',
      };
  
      await userEvent.type(screen.getByRole('textbox', { name: /title/i }), blogDetails.title);
  
      await userEvent.type(screen.getByRole('textbox', { name: /author/i }), blogDetails.author);
  
      await userEvent.type(screen.getByRole('textbox', { name: /url/i }), blogDetails.url);
  
      const submitButton = screen.getByRole('button', { name: /create/i });
      await userEvent.click(submitButton);
  
      expect(createBlog).toHaveBeenCalledTimes(1);
      expect(createBlog).toHaveBeenCalledWith(blogDetails);
    });
});
