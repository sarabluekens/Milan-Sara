import { caregiverStub } from '../stubs/caregivers.stub'

export const CaregiversService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(caregiverStub()),
  save: jest.fn().mockResolvedValue(caregiverStub()),
  updateJobs: jest.fn().mockResolvedValue(caregiverStub()),
  findOneBy: jest.fn().mockResolvedValue(caregiverStub()),
})
