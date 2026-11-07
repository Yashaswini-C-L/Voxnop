import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the 3D WebGL scene for the Node/Jest environment
jest.mock('./components/RoboticsScene', () => () => (
  <div data-testid="mock-robotics-scene">3D Robotics Scene Active</div>
));

test('renders Voxnop coming soon headline and brand elements', () => {
  render(<App />);
  expect(screen.getByText(/The Future of/i)).toBeInTheDocument();
  expect(screen.getByText(/Taking Shape\./i)).toBeInTheDocument();
  expect(screen.getByText(/COMING SOON/i)).toBeInTheDocument();
  expect(screen.getAllByText(/voxnop\.com/i).length).toBeGreaterThan(0);
  expect(screen.getByTestId('mock-robotics-scene')).toBeInTheDocument();
});
