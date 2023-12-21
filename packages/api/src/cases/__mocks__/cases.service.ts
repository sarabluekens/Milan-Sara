import { caseStub } from '../stubs/cases.stub'

export const CasesService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(caseStub()),
  save: jest.fn().mockResolvedValue(caseStub()),
  updateJobs: jest.fn().mockResolvedValue(caseStub()),
  findOneBy: jest.fn().mockResolvedValue(caseStub()),
  findCasesForCaregiverToday: jest.fn().mockResolvedValue([caseStub()]),
})
