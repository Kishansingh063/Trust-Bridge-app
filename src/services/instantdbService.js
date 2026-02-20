import { db } from '../lib/instantdb'

// Campaign operations
export const campaignService = {
  getAll: (filters = {}) => {
    return db.query({
      campaigns: {
        $: {
          where: filters,
        },
      },
    })
  },

  getById: (id) => {
    return db.query({
      campaigns: {
        $: {
          where: { id },
        },
      },
    })
  },

  create: async (data) => {
    const campaignId = db.id()
    await db.transact(
      db.tx.campaigns[campaignId].update({
        ...data,
        raised: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })
    )
    return campaignId
  },

  update: async (id, data) => {
    await db.transact(
      db.tx.campaigns[id].update({
        ...data,
        updatedAt: Date.now(),
      })
    )
  },

  delete: async (id) => {
    await db.transact(db.tx.campaigns[id].delete())
  },
}

// Donation operations
export const donationService = {
  create: async (data) => {
    const donationId = db.id()
    await db.transact(
      db.tx.donations[donationId].update({
        ...data,
        status: 'completed',
        createdAt: Date.now(),
      })
    )
    
    // Update campaign raised amount
    const campaign = await db.query({
      campaigns: {
        $: {
          where: { id: data.campaignId },
        },
      },
    })
    
    if (campaign?.data?.campaigns?.[0]) {
      const currentRaised = campaign.data.campaigns[0].raised || 0
      await db.transact(
        db.tx.campaigns[data.campaignId].update({
          raised: currentRaised + data.amount,
        })
      )
    }
    
    return donationId
  },

  getByUser: (userId) => {
    return db.query({
      donations: {
        $: {
          where: { donorId: userId },
        },
      },
    })
  },

  getByCampaign: (campaignId) => {
    return db.query({
      donations: {
        $: {
          where: { campaignId },
        },
      },
    })
  },
}

// Event operations
export const eventService = {
  getAll: () => {
    return db.query({
      events: {},
    })
  },

  getById: (id) => {
    return db.query({
      events: {
        $: {
          where: { id },
        },
      },
    })
  },

  create: async (data) => {
    const eventId = db.id()
    await db.transact(
      db.tx.events[eventId].update({
        ...data,
        createdAt: Date.now(),
      })
    )
    return eventId
  },
}

// Fund Usage operations
export const fundUsageService = {
  create: async (data) => {
    const fundUsageId = db.id()
    await db.transact(
      db.tx.fundUsage[fundUsageId].update({
        ...data,
        createdAt: Date.now(),
      })
    )
    return fundUsageId
  },

  getByCampaign: (campaignId) => {
    return db.query({
      fundUsage: {
        $: {
          where: { campaignId },
        },
      },
    })
  },
}

// Volunteer operations
export const volunteerService = {
  create: async (data) => {
    const volunteerId = db.id()
    await db.transact(
      db.tx.volunteers[volunteerId].update({
        ...data,
        status: 'pending',
        createdAt: Date.now(),
      })
    )
    return volunteerId
  },

  getByNGO: (ngoId) => {
    return db.query({
      volunteers: {
        $: {
          where: { ngoId },
        },
      },
    })
  },

  updateStatus: async (id, status) => {
    await db.transact(
      db.tx.volunteers[id].update({
        status,
      })
    )
  },
}

// Report operations
export const reportService = {
  create: async (data) => {
    const reportId = db.id()
    await db.transact(
      db.tx.reports[reportId].update({
        ...data,
        status: 'pending',
        createdAt: Date.now(),
      })
    )
    return reportId
  },

  getAll: () => {
    return db.query({
      reports: {},
    })
  },

  updateStatus: async (id, status) => {
    await db.transact(
      db.tx.reports[id].update({
        status,
      })
    )
  },
}

export default {
  campaignService,
  donationService,
  eventService,
  fundUsageService,
  volunteerService,
  reportService,
}
