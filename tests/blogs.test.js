import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Blog from '../src/components/Blog';

describe('<Blog />', () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5
  };

  test('renders title and author but not url or likes by default', () => {
    render(<Blog blog={blog} />);

    // Check that the title and author are rendered
    expect(screen.getByText(`${blog.title} by ${blog.author}`)).toBeInTheDocument();

    // Check that the URL and likes are not rendered by default
    expect(screen.queryByText(blog.url)).not.toBeInTheDocument();
    expect(screen.queryByText(`Likes: ${blog.likes}`)).not.toBeInTheDocument();
  });

  test('shows url and likes when the "Show details" button is clicked', async () => {
    render(<Blog blog={blog} />);

    // Simulate clicking the button to show details
    const button = screen.getByRole('button', { name: /show details/i });
    await userEvent.click(button);

    // Check that the URL and likes are now visible
    expect(screen.getByText(blog.url)).toBeInTheDocument();
    expect(screen.getByText(`Likes: ${blog.likes}`)).toBeInTheDocument();
  });
});
