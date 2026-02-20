import { init } from '@instantdb/react'

const APP_ID = 'b9ce6a2a-5f26-40a5-9239-5c6dced07a65'

// Schema definition for type safety
const schema = {
  users: {
    id: { type: 'id' },
    email: { type: 'string' },
    name: { type: 'string' },
    role: { type: 'string' }, // 'donor', 'ngo', 'admin'
    createdAt: { type: 'number' },
    updatedAt: { type: 'number' },
  },
  campaigns: {
    id: { type: 'id' },
    title: { type: 'string' },
    description: { type: 'string' },
    fullDescription: { type: 'string' },
    target: { type: 'number' },
    raised: { type: 'number' },
    category: { type: 'string' },
    isEmergency: { type: 'boolean' },
    ngoId: { type: 'id', nullable: true },
    createdAt: { type: 'number' },
    updatedAt: { type: 'number' },
  },
  donations: {
    id: { type: 'id' },
    campaignId: { type: 'id' },
    donorId: { type: 'id' },
    amount: { type: 'number' },
    status: { type: 'string' }, // 'pending', 'completed', 'failed'
    createdAt: { type: 'number' },
  },
  events: {
    id: { type: 'id' },
    title: { type: 'string' },
    description: { type: 'string' },
    location: { type: 'string' },
    date: { type: 'string' },
    time: { type: 'string' },
    type: { type: 'string' },
    organizerId: { type: 'id' },
    createdAt: { type: 'number' },
  },
  fundUsage: {
    id: { type: 'id' },
    campaignId: { type: 'id' },
    amount: { type: 'number' },
    description: { type: 'string' },
    proofUrl: { type: 'string', nullable: true },
    date: { type: 'string' },
    createdAt: { type: 'number' },
  },
  volunteers: {
    id: { type: 'id' },
    ngoId: { type: 'id' },
    userId: { type: 'id' },
    status: { type: 'string' }, // 'pending', 'active', 'rejected'
    joinedDate: { type: 'string' },
    createdAt: { type: 'number' },
  },
  reports: {
    id: { type: 'id' },
    campaignId: { type: 'id' },
    reportedBy: { type: 'id' },
    reason: { type: 'string' },
    status: { type: 'string' }, // 'pending', 'investigating', 'resolved'
    createdAt: { type: 'number' },
  },
}

// Initialize InstantDB with schema
export const db = init({ appId: APP_ID, schema })

export default db
