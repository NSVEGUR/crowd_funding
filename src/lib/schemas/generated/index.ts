import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const CampaignScalarFieldEnumSchema = z.enum(['id','userName','userId','title','story','target','type','othersType','image','endDate','amountCollected']);

export const DonationScalarFieldEnumSchema = z.enum(['id','userId','campaignId','amount','anonymous']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const StripeUserScalarFieldEnumSchema = z.enum(['id','email','name','phone','userId']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','name','role','createdAt','updatedAt']);

export const WithdrawalRequestScalarFieldEnumSchema = z.enum(['id','campaignId','amount','createdAt','transitNumber','institutionNumber','accountNumber','approved']);

export const RoleSchema = z.enum(['ADMIN','USER']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export const CampaignTypeSchema = z.enum(['Personal','NGO','Education','Others']);

export type CampaignTypeType = `${z.infer<typeof CampaignTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: RoleSchema,
  id: z.string().uuid(),
  email: z.string(),
  name: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// CAMPAIGN SCHEMA
/////////////////////////////////////////

export const CampaignSchema = z.object({
  type: CampaignTypeSchema,
  id: z.string().uuid(),
  userName: z.string(),
  userId: z.string(),
  title: z.string(),
  story: z.string(),
  target: z.number(),
  othersType: z.string().nullable(),
  image: z.string(),
  endDate: z.coerce.date(),
  amountCollected: z.number(),
})

export type Campaign = z.infer<typeof CampaignSchema>

/////////////////////////////////////////
// DONATION SCHEMA
/////////////////////////////////////////

export const DonationSchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  campaignId: z.string(),
  amount: z.number(),
  anonymous: z.boolean(),
})

export type Donation = z.infer<typeof DonationSchema>

/////////////////////////////////////////
// STRIPE USER SCHEMA
/////////////////////////////////////////

export const StripeUserSchema = z.object({
  id: z.string().uuid(),
  email: z.string(),
  name: z.string().nullable(),
  phone: z.string().nullable(),
  userId: z.string().nullable(),
})

export type StripeUser = z.infer<typeof StripeUserSchema>

/////////////////////////////////////////
// WITHDRAWAL REQUEST SCHEMA
/////////////////////////////////////////

export const WithdrawalRequestSchema = z.object({
  id: z.string().uuid(),
  campaignId: z.string(),
  amount: z.number(),
  createdAt: z.coerce.date(),
  transitNumber: z.number().int(),
  institutionNumber: z.number().int(),
  accountNumber: z.number().int(),
  approved: z.boolean(),
})

export type WithdrawalRequest = z.infer<typeof WithdrawalRequestSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  stripeUser: z.union([z.boolean(),z.lazy(() => StripeUserArgsSchema)]).optional(),
  campaigns: z.union([z.boolean(),z.lazy(() => CampaignFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  campaigns: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  role: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  stripeUser: z.union([z.boolean(),z.lazy(() => StripeUserArgsSchema)]).optional(),
  campaigns: z.union([z.boolean(),z.lazy(() => CampaignFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CAMPAIGN
//------------------------------------------------------

export const CampaignIncludeSchema: z.ZodType<Prisma.CampaignInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  donations: z.union([z.boolean(),z.lazy(() => DonationFindManyArgsSchema)]).optional(),
  withdrawalRequests: z.union([z.boolean(),z.lazy(() => WithdrawalRequestFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CampaignCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CampaignArgsSchema: z.ZodType<Prisma.CampaignArgs> = z.object({
  select: z.lazy(() => CampaignSelectSchema).optional(),
  include: z.lazy(() => CampaignIncludeSchema).optional(),
}).strict();

export const CampaignCountOutputTypeArgsSchema: z.ZodType<Prisma.CampaignCountOutputTypeArgs> = z.object({
  select: z.lazy(() => CampaignCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CampaignCountOutputTypeSelectSchema: z.ZodType<Prisma.CampaignCountOutputTypeSelect> = z.object({
  donations: z.boolean().optional(),
  withdrawalRequests: z.boolean().optional(),
}).strict();

export const CampaignSelectSchema: z.ZodType<Prisma.CampaignSelect> = z.object({
  id: z.boolean().optional(),
  userName: z.boolean().optional(),
  userId: z.boolean().optional(),
  title: z.boolean().optional(),
  story: z.boolean().optional(),
  target: z.boolean().optional(),
  type: z.boolean().optional(),
  othersType: z.boolean().optional(),
  image: z.boolean().optional(),
  endDate: z.boolean().optional(),
  amountCollected: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  donations: z.union([z.boolean(),z.lazy(() => DonationFindManyArgsSchema)]).optional(),
  withdrawalRequests: z.union([z.boolean(),z.lazy(() => WithdrawalRequestFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CampaignCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DONATION
//------------------------------------------------------

export const DonationIncludeSchema: z.ZodType<Prisma.DonationInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => StripeUserArgsSchema)]).optional(),
  campaign: z.union([z.boolean(),z.lazy(() => CampaignArgsSchema)]).optional(),
}).strict()

export const DonationArgsSchema: z.ZodType<Prisma.DonationArgs> = z.object({
  select: z.lazy(() => DonationSelectSchema).optional(),
  include: z.lazy(() => DonationIncludeSchema).optional(),
}).strict();

export const DonationSelectSchema: z.ZodType<Prisma.DonationSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  campaignId: z.boolean().optional(),
  amount: z.boolean().optional(),
  anonymous: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => StripeUserArgsSchema)]).optional(),
  campaign: z.union([z.boolean(),z.lazy(() => CampaignArgsSchema)]).optional(),
}).strict()

// STRIPE USER
//------------------------------------------------------

export const StripeUserIncludeSchema: z.ZodType<Prisma.StripeUserInclude> = z.object({
  donations: z.union([z.boolean(),z.lazy(() => DonationFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StripeUserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const StripeUserArgsSchema: z.ZodType<Prisma.StripeUserArgs> = z.object({
  select: z.lazy(() => StripeUserSelectSchema).optional(),
  include: z.lazy(() => StripeUserIncludeSchema).optional(),
}).strict();

export const StripeUserCountOutputTypeArgsSchema: z.ZodType<Prisma.StripeUserCountOutputTypeArgs> = z.object({
  select: z.lazy(() => StripeUserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const StripeUserCountOutputTypeSelectSchema: z.ZodType<Prisma.StripeUserCountOutputTypeSelect> = z.object({
  donations: z.boolean().optional(),
}).strict();

export const StripeUserSelectSchema: z.ZodType<Prisma.StripeUserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  phone: z.boolean().optional(),
  userId: z.boolean().optional(),
  donations: z.union([z.boolean(),z.lazy(() => DonationFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StripeUserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// WITHDRAWAL REQUEST
//------------------------------------------------------

export const WithdrawalRequestIncludeSchema: z.ZodType<Prisma.WithdrawalRequestInclude> = z.object({
  campaign: z.union([z.boolean(),z.lazy(() => CampaignArgsSchema)]).optional(),
}).strict()

export const WithdrawalRequestArgsSchema: z.ZodType<Prisma.WithdrawalRequestArgs> = z.object({
  select: z.lazy(() => WithdrawalRequestSelectSchema).optional(),
  include: z.lazy(() => WithdrawalRequestIncludeSchema).optional(),
}).strict();

export const WithdrawalRequestSelectSchema: z.ZodType<Prisma.WithdrawalRequestSelect> = z.object({
  id: z.boolean().optional(),
  campaignId: z.boolean().optional(),
  amount: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  transitNumber: z.boolean().optional(),
  institutionNumber: z.boolean().optional(),
  accountNumber: z.boolean().optional(),
  approved: z.boolean().optional(),
  campaign: z.union([z.boolean(),z.lazy(() => CampaignArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  stripeUser: z.union([ z.lazy(() => StripeUserRelationFilterSchema),z.lazy(() => StripeUserWhereInputSchema) ]).optional().nullable(),
  campaigns: z.lazy(() => CampaignListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  stripeUser: z.lazy(() => StripeUserOrderByWithRelationInputSchema).optional(),
  campaigns: z.lazy(() => CampaignOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional()
}).strict();

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumRoleWithAggregatesFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CampaignWhereInputSchema: z.ZodType<Prisma.CampaignWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CampaignWhereInputSchema),z.lazy(() => CampaignWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CampaignWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CampaignWhereInputSchema),z.lazy(() => CampaignWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  story: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  target: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => EnumCampaignTypeFilterSchema),z.lazy(() => CampaignTypeSchema) ]).optional(),
  othersType: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  amountCollected: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  donations: z.lazy(() => DonationListRelationFilterSchema).optional(),
  withdrawalRequests: z.lazy(() => WithdrawalRequestListRelationFilterSchema).optional()
}).strict();

export const CampaignOrderByWithRelationInputSchema: z.ZodType<Prisma.CampaignOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userName: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  story: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  othersType: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  amountCollected: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  donations: z.lazy(() => DonationOrderByRelationAggregateInputSchema).optional(),
  withdrawalRequests: z.lazy(() => WithdrawalRequestOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CampaignWhereUniqueInputSchema: z.ZodType<Prisma.CampaignWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const CampaignOrderByWithAggregationInputSchema: z.ZodType<Prisma.CampaignOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userName: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  story: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  othersType: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  amountCollected: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CampaignCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CampaignAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CampaignMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CampaignMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CampaignSumOrderByAggregateInputSchema).optional()
}).strict();

export const CampaignScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CampaignScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CampaignScalarWhereWithAggregatesInputSchema),z.lazy(() => CampaignScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CampaignScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CampaignScalarWhereWithAggregatesInputSchema),z.lazy(() => CampaignScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  story: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  target: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => EnumCampaignTypeWithAggregatesFilterSchema),z.lazy(() => CampaignTypeSchema) ]).optional(),
  othersType: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  amountCollected: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const DonationWhereInputSchema: z.ZodType<Prisma.DonationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DonationWhereInputSchema),z.lazy(() => DonationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DonationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DonationWhereInputSchema),z.lazy(() => DonationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  campaignId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  anonymous: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  user: z.union([ z.lazy(() => StripeUserRelationFilterSchema),z.lazy(() => StripeUserWhereInputSchema) ]).optional(),
  campaign: z.union([ z.lazy(() => CampaignRelationFilterSchema),z.lazy(() => CampaignWhereInputSchema) ]).optional(),
}).strict();

export const DonationOrderByWithRelationInputSchema: z.ZodType<Prisma.DonationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  campaignId: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  anonymous: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => StripeUserOrderByWithRelationInputSchema).optional(),
  campaign: z.lazy(() => CampaignOrderByWithRelationInputSchema).optional()
}).strict();

export const DonationWhereUniqueInputSchema: z.ZodType<Prisma.DonationWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const DonationOrderByWithAggregationInputSchema: z.ZodType<Prisma.DonationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  campaignId: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  anonymous: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DonationCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => DonationAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DonationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DonationMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => DonationSumOrderByAggregateInputSchema).optional()
}).strict();

export const DonationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DonationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DonationScalarWhereWithAggregatesInputSchema),z.lazy(() => DonationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DonationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DonationScalarWhereWithAggregatesInputSchema),z.lazy(() => DonationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  campaignId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  anonymous: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const StripeUserWhereInputSchema: z.ZodType<Prisma.StripeUserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StripeUserWhereInputSchema),z.lazy(() => StripeUserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StripeUserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StripeUserWhereInputSchema),z.lazy(() => StripeUserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  donations: z.lazy(() => DonationListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict();

export const StripeUserOrderByWithRelationInputSchema: z.ZodType<Prisma.StripeUserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  donations: z.lazy(() => DonationOrderByRelationAggregateInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const StripeUserWhereUniqueInputSchema: z.ZodType<Prisma.StripeUserWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional(),
  userId: z.string().optional()
}).strict();

export const StripeUserOrderByWithAggregationInputSchema: z.ZodType<Prisma.StripeUserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => StripeUserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => StripeUserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => StripeUserMinOrderByAggregateInputSchema).optional()
}).strict();

export const StripeUserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StripeUserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => StripeUserScalarWhereWithAggregatesInputSchema),z.lazy(() => StripeUserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => StripeUserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StripeUserScalarWhereWithAggregatesInputSchema),z.lazy(() => StripeUserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const WithdrawalRequestWhereInputSchema: z.ZodType<Prisma.WithdrawalRequestWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WithdrawalRequestWhereInputSchema),z.lazy(() => WithdrawalRequestWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WithdrawalRequestWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WithdrawalRequestWhereInputSchema),z.lazy(() => WithdrawalRequestWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  campaignId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  transitNumber: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  institutionNumber: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  accountNumber: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  approved: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  campaign: z.union([ z.lazy(() => CampaignRelationFilterSchema),z.lazy(() => CampaignWhereInputSchema) ]).optional(),
}).strict();

export const WithdrawalRequestOrderByWithRelationInputSchema: z.ZodType<Prisma.WithdrawalRequestOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  campaignId: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  transitNumber: z.lazy(() => SortOrderSchema).optional(),
  institutionNumber: z.lazy(() => SortOrderSchema).optional(),
  accountNumber: z.lazy(() => SortOrderSchema).optional(),
  approved: z.lazy(() => SortOrderSchema).optional(),
  campaign: z.lazy(() => CampaignOrderByWithRelationInputSchema).optional()
}).strict();

export const WithdrawalRequestWhereUniqueInputSchema: z.ZodType<Prisma.WithdrawalRequestWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const WithdrawalRequestOrderByWithAggregationInputSchema: z.ZodType<Prisma.WithdrawalRequestOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  campaignId: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  transitNumber: z.lazy(() => SortOrderSchema).optional(),
  institutionNumber: z.lazy(() => SortOrderSchema).optional(),
  accountNumber: z.lazy(() => SortOrderSchema).optional(),
  approved: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => WithdrawalRequestCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => WithdrawalRequestAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => WithdrawalRequestMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => WithdrawalRequestMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => WithdrawalRequestSumOrderByAggregateInputSchema).optional()
}).strict();

export const WithdrawalRequestScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.WithdrawalRequestScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => WithdrawalRequestScalarWhereWithAggregatesInputSchema),z.lazy(() => WithdrawalRequestScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => WithdrawalRequestScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WithdrawalRequestScalarWhereWithAggregatesInputSchema),z.lazy(() => WithdrawalRequestScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  campaignId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  transitNumber: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  institutionNumber: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  accountNumber: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  approved: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  stripeUser: z.lazy(() => StripeUserCreateNestedOneWithoutUserInputSchema).optional(),
  campaigns: z.lazy(() => CampaignCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  stripeUser: z.lazy(() => StripeUserUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  campaigns: z.lazy(() => CampaignUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  stripeUser: z.lazy(() => StripeUserUpdateOneWithoutUserNestedInputSchema).optional(),
  campaigns: z.lazy(() => CampaignUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  stripeUser: z.lazy(() => StripeUserUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  campaigns: z.lazy(() => CampaignUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CampaignCreateInputSchema: z.ZodType<Prisma.CampaignCreateInput> = z.object({
  id: z.string().uuid().optional(),
  userName: z.string().optional(),
  title: z.string(),
  story: z.string(),
  target: z.number(),
  type: z.lazy(() => CampaignTypeSchema),
  othersType: z.string().optional().nullable(),
  image: z.string(),
  endDate: z.coerce.date(),
  amountCollected: z.number().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCampaignsInputSchema),
  donations: z.lazy(() => DonationCreateNestedManyWithoutCampaignInputSchema).optional(),
  withdrawalRequests: z.lazy(() => WithdrawalRequestCreateNestedManyWithoutCampaignInputSchema).optional()
}).strict();

export const CampaignUncheckedCreateInputSchema: z.ZodType<Prisma.CampaignUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  userName: z.string().optional(),
  userId: z.string(),
  title: z.string(),
  story: z.string(),
  target: z.number(),
  type: z.lazy(() => CampaignTypeSchema),
  othersType: z.string().optional().nullable(),
  image: z.string(),
  endDate: z.coerce.date(),
  amountCollected: z.number().optional(),
  donations: z.lazy(() => DonationUncheckedCreateNestedManyWithoutCampaignInputSchema).optional(),
  withdrawalRequests: z.lazy(() => WithdrawalRequestUncheckedCreateNestedManyWithoutCampaignInputSchema).optional()
}).strict();

export const CampaignUpdateInputSchema: z.ZodType<Prisma.CampaignUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  story: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  target: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => CampaignTypeSchema),z.lazy(() => EnumCampaignTypeFieldUpdateOperationsInputSchema) ]).optional(),
  othersType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amountCollected: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCampaignsNestedInputSchema).optional(),
  donations: z.lazy(() => DonationUpdateManyWithoutCampaignNestedInputSchema).optional(),
  withdrawalRequests: z.lazy(() => WithdrawalRequestUpdateManyWithoutCampaignNestedInputSchema).optional()
}).strict();

export const CampaignUncheckedUpdateInputSchema: z.ZodType<Prisma.CampaignUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  story: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  target: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => CampaignTypeSchema),z.lazy(() => EnumCampaignTypeFieldUpdateOperationsInputSchema) ]).optional(),
  othersType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amountCollected: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  donations: z.lazy(() => DonationUncheckedUpdateManyWithoutCampaignNestedInputSchema).optional(),
  withdrawalRequests: z.lazy(() => WithdrawalRequestUncheckedUpdateManyWithoutCampaignNestedInputSchema).optional()
}).strict();

export const CampaignCreateManyInputSchema: z.ZodType<Prisma.CampaignCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  userName: z.string().optional(),
  userId: z.string(),
  title: z.string(),
  story: z.string(),
  target: z.number(),
  type: z.lazy(() => CampaignTypeSchema),
  othersType: z.string().optional().nullable(),
  image: z.string(),
  endDate: z.coerce.date(),
  amountCollected: z.number().optional()
}).strict();

export const CampaignUpdateManyMutationInputSchema: z.ZodType<Prisma.CampaignUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  story: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  target: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => CampaignTypeSchema),z.lazy(() => EnumCampaignTypeFieldUpdateOperationsInputSchema) ]).optional(),
  othersType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amountCollected: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CampaignUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CampaignUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  story: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  target: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => CampaignTypeSchema),z.lazy(() => EnumCampaignTypeFieldUpdateOperationsInputSchema) ]).optional(),
  othersType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amountCollected: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DonationCreateInputSchema: z.ZodType<Prisma.DonationCreateInput> = z.object({
  id: z.string().uuid().optional(),
  amount: z.number(),
  anonymous: z.boolean().optional(),
  user: z.lazy(() => StripeUserCreateNestedOneWithoutDonationsInputSchema),
  campaign: z.lazy(() => CampaignCreateNestedOneWithoutDonationsInputSchema)
}).strict();

export const DonationUncheckedCreateInputSchema: z.ZodType<Prisma.DonationUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  campaignId: z.string(),
  amount: z.number(),
  anonymous: z.boolean().optional()
}).strict();

export const DonationUpdateInputSchema: z.ZodType<Prisma.DonationUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  anonymous: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => StripeUserUpdateOneRequiredWithoutDonationsNestedInputSchema).optional(),
  campaign: z.lazy(() => CampaignUpdateOneRequiredWithoutDonationsNestedInputSchema).optional()
}).strict();

export const DonationUncheckedUpdateInputSchema: z.ZodType<Prisma.DonationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  campaignId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  anonymous: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DonationCreateManyInputSchema: z.ZodType<Prisma.DonationCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  campaignId: z.string(),
  amount: z.number(),
  anonymous: z.boolean().optional()
}).strict();

export const DonationUpdateManyMutationInputSchema: z.ZodType<Prisma.DonationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  anonymous: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DonationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DonationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  campaignId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  anonymous: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StripeUserCreateInputSchema: z.ZodType<Prisma.StripeUserCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  donations: z.lazy(() => DonationCreateNestedManyWithoutUserInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutStripeUserInputSchema).optional()
}).strict();

export const StripeUserUncheckedCreateInputSchema: z.ZodType<Prisma.StripeUserUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  userId: z.string().optional().nullable(),
  donations: z.lazy(() => DonationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const StripeUserUpdateInputSchema: z.ZodType<Prisma.StripeUserUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  donations: z.lazy(() => DonationUpdateManyWithoutUserNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneWithoutStripeUserNestedInputSchema).optional()
}).strict();

export const StripeUserUncheckedUpdateInputSchema: z.ZodType<Prisma.StripeUserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  donations: z.lazy(() => DonationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const StripeUserCreateManyInputSchema: z.ZodType<Prisma.StripeUserCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  userId: z.string().optional().nullable()
}).strict();

export const StripeUserUpdateManyMutationInputSchema: z.ZodType<Prisma.StripeUserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StripeUserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StripeUserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const WithdrawalRequestCreateInputSchema: z.ZodType<Prisma.WithdrawalRequestCreateInput> = z.object({
  id: z.string().uuid().optional(),
  amount: z.number(),
  createdAt: z.coerce.date().optional(),
  transitNumber: z.number().int(),
  institutionNumber: z.number().int(),
  accountNumber: z.number().int(),
  approved: z.boolean().optional(),
  campaign: z.lazy(() => CampaignCreateNestedOneWithoutWithdrawalRequestsInputSchema)
}).strict();

export const WithdrawalRequestUncheckedCreateInputSchema: z.ZodType<Prisma.WithdrawalRequestUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  campaignId: z.string(),
  amount: z.number(),
  createdAt: z.coerce.date().optional(),
  transitNumber: z.number().int(),
  institutionNumber: z.number().int(),
  accountNumber: z.number().int(),
  approved: z.boolean().optional()
}).strict();

export const WithdrawalRequestUpdateInputSchema: z.ZodType<Prisma.WithdrawalRequestUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  transitNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  institutionNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accountNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  approved: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  campaign: z.lazy(() => CampaignUpdateOneRequiredWithoutWithdrawalRequestsNestedInputSchema).optional()
}).strict();

export const WithdrawalRequestUncheckedUpdateInputSchema: z.ZodType<Prisma.WithdrawalRequestUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  campaignId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  transitNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  institutionNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accountNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  approved: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WithdrawalRequestCreateManyInputSchema: z.ZodType<Prisma.WithdrawalRequestCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  campaignId: z.string(),
  amount: z.number(),
  createdAt: z.coerce.date().optional(),
  transitNumber: z.number().int(),
  institutionNumber: z.number().int(),
  accountNumber: z.number().int(),
  approved: z.boolean().optional()
}).strict();

export const WithdrawalRequestUpdateManyMutationInputSchema: z.ZodType<Prisma.WithdrawalRequestUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  transitNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  institutionNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accountNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  approved: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WithdrawalRequestUncheckedUpdateManyInputSchema: z.ZodType<Prisma.WithdrawalRequestUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  campaignId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  transitNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  institutionNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accountNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  approved: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const StripeUserRelationFilterSchema: z.ZodType<Prisma.StripeUserRelationFilter> = z.object({
  is: z.lazy(() => StripeUserWhereInputSchema).optional(),
  isNot: z.lazy(() => StripeUserWhereInputSchema).optional()
}).strict();

export const CampaignListRelationFilterSchema: z.ZodType<Prisma.CampaignListRelationFilter> = z.object({
  every: z.lazy(() => CampaignWhereInputSchema).optional(),
  some: z.lazy(() => CampaignWhereInputSchema).optional(),
  none: z.lazy(() => CampaignWhereInputSchema).optional()
}).strict();

export const CampaignOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CampaignOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const EnumCampaignTypeFilterSchema: z.ZodType<Prisma.EnumCampaignTypeFilter> = z.object({
  equals: z.lazy(() => CampaignTypeSchema).optional(),
  in: z.lazy(() => CampaignTypeSchema).array().optional(),
  notIn: z.lazy(() => CampaignTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => CampaignTypeSchema),z.lazy(() => NestedEnumCampaignTypeFilterSchema) ]).optional(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const DonationListRelationFilterSchema: z.ZodType<Prisma.DonationListRelationFilter> = z.object({
  every: z.lazy(() => DonationWhereInputSchema).optional(),
  some: z.lazy(() => DonationWhereInputSchema).optional(),
  none: z.lazy(() => DonationWhereInputSchema).optional()
}).strict();

export const WithdrawalRequestListRelationFilterSchema: z.ZodType<Prisma.WithdrawalRequestListRelationFilter> = z.object({
  every: z.lazy(() => WithdrawalRequestWhereInputSchema).optional(),
  some: z.lazy(() => WithdrawalRequestWhereInputSchema).optional(),
  none: z.lazy(() => WithdrawalRequestWhereInputSchema).optional()
}).strict();

export const DonationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DonationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WithdrawalRequestOrderByRelationAggregateInputSchema: z.ZodType<Prisma.WithdrawalRequestOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CampaignCountOrderByAggregateInputSchema: z.ZodType<Prisma.CampaignCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userName: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  story: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  othersType: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  amountCollected: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CampaignAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CampaignAvgOrderByAggregateInput> = z.object({
  target: z.lazy(() => SortOrderSchema).optional(),
  amountCollected: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CampaignMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CampaignMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userName: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  story: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  othersType: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  amountCollected: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CampaignMinOrderByAggregateInputSchema: z.ZodType<Prisma.CampaignMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userName: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  story: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  othersType: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  amountCollected: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CampaignSumOrderByAggregateInputSchema: z.ZodType<Prisma.CampaignSumOrderByAggregateInput> = z.object({
  target: z.lazy(() => SortOrderSchema).optional(),
  amountCollected: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const EnumCampaignTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumCampaignTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => CampaignTypeSchema).optional(),
  in: z.lazy(() => CampaignTypeSchema).array().optional(),
  notIn: z.lazy(() => CampaignTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => CampaignTypeSchema),z.lazy(() => NestedEnumCampaignTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumCampaignTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumCampaignTypeFilterSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const CampaignRelationFilterSchema: z.ZodType<Prisma.CampaignRelationFilter> = z.object({
  is: z.lazy(() => CampaignWhereInputSchema).optional(),
  isNot: z.lazy(() => CampaignWhereInputSchema).optional()
}).strict();

export const DonationCountOrderByAggregateInputSchema: z.ZodType<Prisma.DonationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  campaignId: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  anonymous: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DonationAvgOrderByAggregateInputSchema: z.ZodType<Prisma.DonationAvgOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DonationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DonationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  campaignId: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  anonymous: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DonationMinOrderByAggregateInputSchema: z.ZodType<Prisma.DonationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  campaignId: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  anonymous: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DonationSumOrderByAggregateInputSchema: z.ZodType<Prisma.DonationSumOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const StripeUserCountOrderByAggregateInputSchema: z.ZodType<Prisma.StripeUserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StripeUserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StripeUserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StripeUserMinOrderByAggregateInputSchema: z.ZodType<Prisma.StripeUserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const WithdrawalRequestCountOrderByAggregateInputSchema: z.ZodType<Prisma.WithdrawalRequestCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  campaignId: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  transitNumber: z.lazy(() => SortOrderSchema).optional(),
  institutionNumber: z.lazy(() => SortOrderSchema).optional(),
  accountNumber: z.lazy(() => SortOrderSchema).optional(),
  approved: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WithdrawalRequestAvgOrderByAggregateInputSchema: z.ZodType<Prisma.WithdrawalRequestAvgOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional(),
  transitNumber: z.lazy(() => SortOrderSchema).optional(),
  institutionNumber: z.lazy(() => SortOrderSchema).optional(),
  accountNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WithdrawalRequestMaxOrderByAggregateInputSchema: z.ZodType<Prisma.WithdrawalRequestMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  campaignId: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  transitNumber: z.lazy(() => SortOrderSchema).optional(),
  institutionNumber: z.lazy(() => SortOrderSchema).optional(),
  accountNumber: z.lazy(() => SortOrderSchema).optional(),
  approved: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WithdrawalRequestMinOrderByAggregateInputSchema: z.ZodType<Prisma.WithdrawalRequestMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  campaignId: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  transitNumber: z.lazy(() => SortOrderSchema).optional(),
  institutionNumber: z.lazy(() => SortOrderSchema).optional(),
  accountNumber: z.lazy(() => SortOrderSchema).optional(),
  approved: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WithdrawalRequestSumOrderByAggregateInputSchema: z.ZodType<Prisma.WithdrawalRequestSumOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional(),
  transitNumber: z.lazy(() => SortOrderSchema).optional(),
  institutionNumber: z.lazy(() => SortOrderSchema).optional(),
  accountNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StripeUserCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.StripeUserCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => StripeUserCreateWithoutUserInputSchema),z.lazy(() => StripeUserUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StripeUserCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => StripeUserWhereUniqueInputSchema).optional()
}).strict();

export const CampaignCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CampaignCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CampaignCreateWithoutUserInputSchema),z.lazy(() => CampaignCreateWithoutUserInputSchema).array(),z.lazy(() => CampaignUncheckedCreateWithoutUserInputSchema),z.lazy(() => CampaignUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CampaignCreateOrConnectWithoutUserInputSchema),z.lazy(() => CampaignCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CampaignCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CampaignWhereUniqueInputSchema),z.lazy(() => CampaignWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StripeUserUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.StripeUserUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => StripeUserCreateWithoutUserInputSchema),z.lazy(() => StripeUserUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StripeUserCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => StripeUserWhereUniqueInputSchema).optional()
}).strict();

export const CampaignUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CampaignUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CampaignCreateWithoutUserInputSchema),z.lazy(() => CampaignCreateWithoutUserInputSchema).array(),z.lazy(() => CampaignUncheckedCreateWithoutUserInputSchema),z.lazy(() => CampaignUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CampaignCreateOrConnectWithoutUserInputSchema),z.lazy(() => CampaignCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CampaignCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CampaignWhereUniqueInputSchema),z.lazy(() => CampaignWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RoleSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const StripeUserUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.StripeUserUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => StripeUserCreateWithoutUserInputSchema),z.lazy(() => StripeUserUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StripeUserCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => StripeUserUpsertWithoutUserInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => StripeUserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StripeUserUpdateWithoutUserInputSchema),z.lazy(() => StripeUserUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const CampaignUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CampaignUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CampaignCreateWithoutUserInputSchema),z.lazy(() => CampaignCreateWithoutUserInputSchema).array(),z.lazy(() => CampaignUncheckedCreateWithoutUserInputSchema),z.lazy(() => CampaignUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CampaignCreateOrConnectWithoutUserInputSchema),z.lazy(() => CampaignCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CampaignUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CampaignUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CampaignCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CampaignWhereUniqueInputSchema),z.lazy(() => CampaignWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CampaignWhereUniqueInputSchema),z.lazy(() => CampaignWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CampaignWhereUniqueInputSchema),z.lazy(() => CampaignWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CampaignWhereUniqueInputSchema),z.lazy(() => CampaignWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CampaignUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CampaignUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CampaignUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CampaignUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CampaignScalarWhereInputSchema),z.lazy(() => CampaignScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StripeUserUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.StripeUserUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => StripeUserCreateWithoutUserInputSchema),z.lazy(() => StripeUserUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StripeUserCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => StripeUserUpsertWithoutUserInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => StripeUserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StripeUserUpdateWithoutUserInputSchema),z.lazy(() => StripeUserUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const CampaignUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CampaignUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CampaignCreateWithoutUserInputSchema),z.lazy(() => CampaignCreateWithoutUserInputSchema).array(),z.lazy(() => CampaignUncheckedCreateWithoutUserInputSchema),z.lazy(() => CampaignUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CampaignCreateOrConnectWithoutUserInputSchema),z.lazy(() => CampaignCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CampaignUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CampaignUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CampaignCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CampaignWhereUniqueInputSchema),z.lazy(() => CampaignWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CampaignWhereUniqueInputSchema),z.lazy(() => CampaignWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CampaignWhereUniqueInputSchema),z.lazy(() => CampaignWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CampaignWhereUniqueInputSchema),z.lazy(() => CampaignWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CampaignUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CampaignUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CampaignUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CampaignUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CampaignScalarWhereInputSchema),z.lazy(() => CampaignScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutCampaignsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCampaignsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCampaignsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCampaignsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCampaignsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const DonationCreateNestedManyWithoutCampaignInputSchema: z.ZodType<Prisma.DonationCreateNestedManyWithoutCampaignInput> = z.object({
  create: z.union([ z.lazy(() => DonationCreateWithoutCampaignInputSchema),z.lazy(() => DonationCreateWithoutCampaignInputSchema).array(),z.lazy(() => DonationUncheckedCreateWithoutCampaignInputSchema),z.lazy(() => DonationUncheckedCreateWithoutCampaignInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DonationCreateOrConnectWithoutCampaignInputSchema),z.lazy(() => DonationCreateOrConnectWithoutCampaignInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DonationCreateManyCampaignInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DonationWhereUniqueInputSchema),z.lazy(() => DonationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const WithdrawalRequestCreateNestedManyWithoutCampaignInputSchema: z.ZodType<Prisma.WithdrawalRequestCreateNestedManyWithoutCampaignInput> = z.object({
  create: z.union([ z.lazy(() => WithdrawalRequestCreateWithoutCampaignInputSchema),z.lazy(() => WithdrawalRequestCreateWithoutCampaignInputSchema).array(),z.lazy(() => WithdrawalRequestUncheckedCreateWithoutCampaignInputSchema),z.lazy(() => WithdrawalRequestUncheckedCreateWithoutCampaignInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WithdrawalRequestCreateOrConnectWithoutCampaignInputSchema),z.lazy(() => WithdrawalRequestCreateOrConnectWithoutCampaignInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WithdrawalRequestCreateManyCampaignInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WithdrawalRequestWhereUniqueInputSchema),z.lazy(() => WithdrawalRequestWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DonationUncheckedCreateNestedManyWithoutCampaignInputSchema: z.ZodType<Prisma.DonationUncheckedCreateNestedManyWithoutCampaignInput> = z.object({
  create: z.union([ z.lazy(() => DonationCreateWithoutCampaignInputSchema),z.lazy(() => DonationCreateWithoutCampaignInputSchema).array(),z.lazy(() => DonationUncheckedCreateWithoutCampaignInputSchema),z.lazy(() => DonationUncheckedCreateWithoutCampaignInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DonationCreateOrConnectWithoutCampaignInputSchema),z.lazy(() => DonationCreateOrConnectWithoutCampaignInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DonationCreateManyCampaignInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DonationWhereUniqueInputSchema),z.lazy(() => DonationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const WithdrawalRequestUncheckedCreateNestedManyWithoutCampaignInputSchema: z.ZodType<Prisma.WithdrawalRequestUncheckedCreateNestedManyWithoutCampaignInput> = z.object({
  create: z.union([ z.lazy(() => WithdrawalRequestCreateWithoutCampaignInputSchema),z.lazy(() => WithdrawalRequestCreateWithoutCampaignInputSchema).array(),z.lazy(() => WithdrawalRequestUncheckedCreateWithoutCampaignInputSchema),z.lazy(() => WithdrawalRequestUncheckedCreateWithoutCampaignInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WithdrawalRequestCreateOrConnectWithoutCampaignInputSchema),z.lazy(() => WithdrawalRequestCreateOrConnectWithoutCampaignInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WithdrawalRequestCreateManyCampaignInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WithdrawalRequestWhereUniqueInputSchema),z.lazy(() => WithdrawalRequestWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const EnumCampaignTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumCampaignTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => CampaignTypeSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutCampaignsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCampaignsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCampaignsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCampaignsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCampaignsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCampaignsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutCampaignsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCampaignsInputSchema) ]).optional(),
}).strict();

export const DonationUpdateManyWithoutCampaignNestedInputSchema: z.ZodType<Prisma.DonationUpdateManyWithoutCampaignNestedInput> = z.object({
  create: z.union([ z.lazy(() => DonationCreateWithoutCampaignInputSchema),z.lazy(() => DonationCreateWithoutCampaignInputSchema).array(),z.lazy(() => DonationUncheckedCreateWithoutCampaignInputSchema),z.lazy(() => DonationUncheckedCreateWithoutCampaignInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DonationCreateOrConnectWithoutCampaignInputSchema),z.lazy(() => DonationCreateOrConnectWithoutCampaignInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DonationUpsertWithWhereUniqueWithoutCampaignInputSchema),z.lazy(() => DonationUpsertWithWhereUniqueWithoutCampaignInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DonationCreateManyCampaignInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DonationWhereUniqueInputSchema),z.lazy(() => DonationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DonationWhereUniqueInputSchema),z.lazy(() => DonationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DonationWhereUniqueInputSchema),z.lazy(() => DonationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DonationWhereUniqueInputSchema),z.lazy(() => DonationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DonationUpdateWithWhereUniqueWithoutCampaignInputSchema),z.lazy(() => DonationUpdateWithWhereUniqueWithoutCampaignInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DonationUpdateManyWithWhereWithoutCampaignInputSchema),z.lazy(() => DonationUpdateManyWithWhereWithoutCampaignInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DonationScalarWhereInputSchema),z.lazy(() => DonationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const WithdrawalRequestUpdateManyWithoutCampaignNestedInputSchema: z.ZodType<Prisma.WithdrawalRequestUpdateManyWithoutCampaignNestedInput> = z.object({
  create: z.union([ z.lazy(() => WithdrawalRequestCreateWithoutCampaignInputSchema),z.lazy(() => WithdrawalRequestCreateWithoutCampaignInputSchema).array(),z.lazy(() => WithdrawalRequestUncheckedCreateWithoutCampaignInputSchema),z.lazy(() => WithdrawalRequestUncheckedCreateWithoutCampaignInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WithdrawalRequestCreateOrConnectWithoutCampaignInputSchema),z.lazy(() => WithdrawalRequestCreateOrConnectWithoutCampaignInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WithdrawalRequestUpsertWithWhereUniqueWithoutCampaignInputSchema),z.lazy(() => WithdrawalRequestUpsertWithWhereUniqueWithoutCampaignInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WithdrawalRequestCreateManyCampaignInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WithdrawalRequestWhereUniqueInputSchema),z.lazy(() => WithdrawalRequestWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WithdrawalRequestWhereUniqueInputSchema),z.lazy(() => WithdrawalRequestWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WithdrawalRequestWhereUniqueInputSchema),z.lazy(() => WithdrawalRequestWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WithdrawalRequestWhereUniqueInputSchema),z.lazy(() => WithdrawalRequestWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WithdrawalRequestUpdateWithWhereUniqueWithoutCampaignInputSchema),z.lazy(() => WithdrawalRequestUpdateWithWhereUniqueWithoutCampaignInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WithdrawalRequestUpdateManyWithWhereWithoutCampaignInputSchema),z.lazy(() => WithdrawalRequestUpdateManyWithWhereWithoutCampaignInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WithdrawalRequestScalarWhereInputSchema),z.lazy(() => WithdrawalRequestScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DonationUncheckedUpdateManyWithoutCampaignNestedInputSchema: z.ZodType<Prisma.DonationUncheckedUpdateManyWithoutCampaignNestedInput> = z.object({
  create: z.union([ z.lazy(() => DonationCreateWithoutCampaignInputSchema),z.lazy(() => DonationCreateWithoutCampaignInputSchema).array(),z.lazy(() => DonationUncheckedCreateWithoutCampaignInputSchema),z.lazy(() => DonationUncheckedCreateWithoutCampaignInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DonationCreateOrConnectWithoutCampaignInputSchema),z.lazy(() => DonationCreateOrConnectWithoutCampaignInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DonationUpsertWithWhereUniqueWithoutCampaignInputSchema),z.lazy(() => DonationUpsertWithWhereUniqueWithoutCampaignInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DonationCreateManyCampaignInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DonationWhereUniqueInputSchema),z.lazy(() => DonationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DonationWhereUniqueInputSchema),z.lazy(() => DonationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DonationWhereUniqueInputSchema),z.lazy(() => DonationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DonationWhereUniqueInputSchema),z.lazy(() => DonationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DonationUpdateWithWhereUniqueWithoutCampaignInputSchema),z.lazy(() => DonationUpdateWithWhereUniqueWithoutCampaignInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DonationUpdateManyWithWhereWithoutCampaignInputSchema),z.lazy(() => DonationUpdateManyWithWhereWithoutCampaignInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DonationScalarWhereInputSchema),z.lazy(() => DonationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const WithdrawalRequestUncheckedUpdateManyWithoutCampaignNestedInputSchema: z.ZodType<Prisma.WithdrawalRequestUncheckedUpdateManyWithoutCampaignNestedInput> = z.object({
  create: z.union([ z.lazy(() => WithdrawalRequestCreateWithoutCampaignInputSchema),z.lazy(() => WithdrawalRequestCreateWithoutCampaignInputSchema).array(),z.lazy(() => WithdrawalRequestUncheckedCreateWithoutCampaignInputSchema),z.lazy(() => WithdrawalRequestUncheckedCreateWithoutCampaignInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WithdrawalRequestCreateOrConnectWithoutCampaignInputSchema),z.lazy(() => WithdrawalRequestCreateOrConnectWithoutCampaignInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WithdrawalRequestUpsertWithWhereUniqueWithoutCampaignInputSchema),z.lazy(() => WithdrawalRequestUpsertWithWhereUniqueWithoutCampaignInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WithdrawalRequestCreateManyCampaignInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WithdrawalRequestWhereUniqueInputSchema),z.lazy(() => WithdrawalRequestWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WithdrawalRequestWhereUniqueInputSchema),z.lazy(() => WithdrawalRequestWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WithdrawalRequestWhereUniqueInputSchema),z.lazy(() => WithdrawalRequestWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WithdrawalRequestWhereUniqueInputSchema),z.lazy(() => WithdrawalRequestWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WithdrawalRequestUpdateWithWhereUniqueWithoutCampaignInputSchema),z.lazy(() => WithdrawalRequestUpdateWithWhereUniqueWithoutCampaignInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WithdrawalRequestUpdateManyWithWhereWithoutCampaignInputSchema),z.lazy(() => WithdrawalRequestUpdateManyWithWhereWithoutCampaignInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WithdrawalRequestScalarWhereInputSchema),z.lazy(() => WithdrawalRequestScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StripeUserCreateNestedOneWithoutDonationsInputSchema: z.ZodType<Prisma.StripeUserCreateNestedOneWithoutDonationsInput> = z.object({
  create: z.union([ z.lazy(() => StripeUserCreateWithoutDonationsInputSchema),z.lazy(() => StripeUserUncheckedCreateWithoutDonationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StripeUserCreateOrConnectWithoutDonationsInputSchema).optional(),
  connect: z.lazy(() => StripeUserWhereUniqueInputSchema).optional()
}).strict();

export const CampaignCreateNestedOneWithoutDonationsInputSchema: z.ZodType<Prisma.CampaignCreateNestedOneWithoutDonationsInput> = z.object({
  create: z.union([ z.lazy(() => CampaignCreateWithoutDonationsInputSchema),z.lazy(() => CampaignUncheckedCreateWithoutDonationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CampaignCreateOrConnectWithoutDonationsInputSchema).optional(),
  connect: z.lazy(() => CampaignWhereUniqueInputSchema).optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const StripeUserUpdateOneRequiredWithoutDonationsNestedInputSchema: z.ZodType<Prisma.StripeUserUpdateOneRequiredWithoutDonationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => StripeUserCreateWithoutDonationsInputSchema),z.lazy(() => StripeUserUncheckedCreateWithoutDonationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StripeUserCreateOrConnectWithoutDonationsInputSchema).optional(),
  upsert: z.lazy(() => StripeUserUpsertWithoutDonationsInputSchema).optional(),
  connect: z.lazy(() => StripeUserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StripeUserUpdateWithoutDonationsInputSchema),z.lazy(() => StripeUserUncheckedUpdateWithoutDonationsInputSchema) ]).optional(),
}).strict();

export const CampaignUpdateOneRequiredWithoutDonationsNestedInputSchema: z.ZodType<Prisma.CampaignUpdateOneRequiredWithoutDonationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CampaignCreateWithoutDonationsInputSchema),z.lazy(() => CampaignUncheckedCreateWithoutDonationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CampaignCreateOrConnectWithoutDonationsInputSchema).optional(),
  upsert: z.lazy(() => CampaignUpsertWithoutDonationsInputSchema).optional(),
  connect: z.lazy(() => CampaignWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CampaignUpdateWithoutDonationsInputSchema),z.lazy(() => CampaignUncheckedUpdateWithoutDonationsInputSchema) ]).optional(),
}).strict();

export const DonationCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.DonationCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => DonationCreateWithoutUserInputSchema),z.lazy(() => DonationCreateWithoutUserInputSchema).array(),z.lazy(() => DonationUncheckedCreateWithoutUserInputSchema),z.lazy(() => DonationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DonationCreateOrConnectWithoutUserInputSchema),z.lazy(() => DonationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DonationCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DonationWhereUniqueInputSchema),z.lazy(() => DonationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutStripeUserInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutStripeUserInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutStripeUserInputSchema),z.lazy(() => UserUncheckedCreateWithoutStripeUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutStripeUserInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const DonationUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.DonationUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => DonationCreateWithoutUserInputSchema),z.lazy(() => DonationCreateWithoutUserInputSchema).array(),z.lazy(() => DonationUncheckedCreateWithoutUserInputSchema),z.lazy(() => DonationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DonationCreateOrConnectWithoutUserInputSchema),z.lazy(() => DonationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DonationCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DonationWhereUniqueInputSchema),z.lazy(() => DonationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DonationUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.DonationUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => DonationCreateWithoutUserInputSchema),z.lazy(() => DonationCreateWithoutUserInputSchema).array(),z.lazy(() => DonationUncheckedCreateWithoutUserInputSchema),z.lazy(() => DonationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DonationCreateOrConnectWithoutUserInputSchema),z.lazy(() => DonationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DonationUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => DonationUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DonationCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DonationWhereUniqueInputSchema),z.lazy(() => DonationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DonationWhereUniqueInputSchema),z.lazy(() => DonationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DonationWhereUniqueInputSchema),z.lazy(() => DonationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DonationWhereUniqueInputSchema),z.lazy(() => DonationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DonationUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => DonationUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DonationUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => DonationUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DonationScalarWhereInputSchema),z.lazy(() => DonationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneWithoutStripeUserNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutStripeUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutStripeUserInputSchema),z.lazy(() => UserUncheckedCreateWithoutStripeUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutStripeUserInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutStripeUserInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutStripeUserInputSchema),z.lazy(() => UserUncheckedUpdateWithoutStripeUserInputSchema) ]).optional(),
}).strict();

export const DonationUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.DonationUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => DonationCreateWithoutUserInputSchema),z.lazy(() => DonationCreateWithoutUserInputSchema).array(),z.lazy(() => DonationUncheckedCreateWithoutUserInputSchema),z.lazy(() => DonationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DonationCreateOrConnectWithoutUserInputSchema),z.lazy(() => DonationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DonationUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => DonationUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DonationCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DonationWhereUniqueInputSchema),z.lazy(() => DonationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DonationWhereUniqueInputSchema),z.lazy(() => DonationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DonationWhereUniqueInputSchema),z.lazy(() => DonationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DonationWhereUniqueInputSchema),z.lazy(() => DonationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DonationUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => DonationUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DonationUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => DonationUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DonationScalarWhereInputSchema),z.lazy(() => DonationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CampaignCreateNestedOneWithoutWithdrawalRequestsInputSchema: z.ZodType<Prisma.CampaignCreateNestedOneWithoutWithdrawalRequestsInput> = z.object({
  create: z.union([ z.lazy(() => CampaignCreateWithoutWithdrawalRequestsInputSchema),z.lazy(() => CampaignUncheckedCreateWithoutWithdrawalRequestsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CampaignCreateOrConnectWithoutWithdrawalRequestsInputSchema).optional(),
  connect: z.lazy(() => CampaignWhereUniqueInputSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const CampaignUpdateOneRequiredWithoutWithdrawalRequestsNestedInputSchema: z.ZodType<Prisma.CampaignUpdateOneRequiredWithoutWithdrawalRequestsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CampaignCreateWithoutWithdrawalRequestsInputSchema),z.lazy(() => CampaignUncheckedCreateWithoutWithdrawalRequestsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CampaignCreateOrConnectWithoutWithdrawalRequestsInputSchema).optional(),
  upsert: z.lazy(() => CampaignUpsertWithoutWithdrawalRequestsInputSchema).optional(),
  connect: z.lazy(() => CampaignWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CampaignUpdateWithoutWithdrawalRequestsInputSchema),z.lazy(() => CampaignUncheckedUpdateWithoutWithdrawalRequestsInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedEnumCampaignTypeFilterSchema: z.ZodType<Prisma.NestedEnumCampaignTypeFilter> = z.object({
  equals: z.lazy(() => CampaignTypeSchema).optional(),
  in: z.lazy(() => CampaignTypeSchema).array().optional(),
  notIn: z.lazy(() => CampaignTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => CampaignTypeSchema),z.lazy(() => NestedEnumCampaignTypeFilterSchema) ]).optional(),
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedEnumCampaignTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumCampaignTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => CampaignTypeSchema).optional(),
  in: z.lazy(() => CampaignTypeSchema).array().optional(),
  notIn: z.lazy(() => CampaignTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => CampaignTypeSchema),z.lazy(() => NestedEnumCampaignTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumCampaignTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumCampaignTypeFilterSchema).optional()
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StripeUserCreateWithoutUserInputSchema: z.ZodType<Prisma.StripeUserCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  donations: z.lazy(() => DonationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const StripeUserUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.StripeUserUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  donations: z.lazy(() => DonationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const StripeUserCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.StripeUserCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => StripeUserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StripeUserCreateWithoutUserInputSchema),z.lazy(() => StripeUserUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CampaignCreateWithoutUserInputSchema: z.ZodType<Prisma.CampaignCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  userName: z.string().optional(),
  title: z.string(),
  story: z.string(),
  target: z.number(),
  type: z.lazy(() => CampaignTypeSchema),
  othersType: z.string().optional().nullable(),
  image: z.string(),
  endDate: z.coerce.date(),
  amountCollected: z.number().optional(),
  donations: z.lazy(() => DonationCreateNestedManyWithoutCampaignInputSchema).optional(),
  withdrawalRequests: z.lazy(() => WithdrawalRequestCreateNestedManyWithoutCampaignInputSchema).optional()
}).strict();

export const CampaignUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.CampaignUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  userName: z.string().optional(),
  title: z.string(),
  story: z.string(),
  target: z.number(),
  type: z.lazy(() => CampaignTypeSchema),
  othersType: z.string().optional().nullable(),
  image: z.string(),
  endDate: z.coerce.date(),
  amountCollected: z.number().optional(),
  donations: z.lazy(() => DonationUncheckedCreateNestedManyWithoutCampaignInputSchema).optional(),
  withdrawalRequests: z.lazy(() => WithdrawalRequestUncheckedCreateNestedManyWithoutCampaignInputSchema).optional()
}).strict();

export const CampaignCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.CampaignCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => CampaignWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CampaignCreateWithoutUserInputSchema),z.lazy(() => CampaignUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CampaignCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.CampaignCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CampaignCreateManyUserInputSchema),z.lazy(() => CampaignCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const StripeUserUpsertWithoutUserInputSchema: z.ZodType<Prisma.StripeUserUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => StripeUserUpdateWithoutUserInputSchema),z.lazy(() => StripeUserUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => StripeUserCreateWithoutUserInputSchema),z.lazy(() => StripeUserUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const StripeUserUpdateWithoutUserInputSchema: z.ZodType<Prisma.StripeUserUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  donations: z.lazy(() => DonationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const StripeUserUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.StripeUserUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  donations: z.lazy(() => DonationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const CampaignUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CampaignUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CampaignWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CampaignUpdateWithoutUserInputSchema),z.lazy(() => CampaignUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => CampaignCreateWithoutUserInputSchema),z.lazy(() => CampaignUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CampaignUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CampaignUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CampaignWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CampaignUpdateWithoutUserInputSchema),z.lazy(() => CampaignUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const CampaignUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.CampaignUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => CampaignScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CampaignUpdateManyMutationInputSchema),z.lazy(() => CampaignUncheckedUpdateManyWithoutCampaignsInputSchema) ]),
}).strict();

export const CampaignScalarWhereInputSchema: z.ZodType<Prisma.CampaignScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CampaignScalarWhereInputSchema),z.lazy(() => CampaignScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CampaignScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CampaignScalarWhereInputSchema),z.lazy(() => CampaignScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  story: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  target: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => EnumCampaignTypeFilterSchema),z.lazy(() => CampaignTypeSchema) ]).optional(),
  othersType: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  amountCollected: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
}).strict();

export const UserCreateWithoutCampaignsInputSchema: z.ZodType<Prisma.UserCreateWithoutCampaignsInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  stripeUser: z.lazy(() => StripeUserCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCampaignsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCampaignsInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  stripeUser: z.lazy(() => StripeUserUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCampaignsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCampaignsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCampaignsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCampaignsInputSchema) ]),
}).strict();

export const DonationCreateWithoutCampaignInputSchema: z.ZodType<Prisma.DonationCreateWithoutCampaignInput> = z.object({
  id: z.string().optional(),
  amount: z.number(),
  anonymous: z.boolean().optional(),
  user: z.lazy(() => StripeUserCreateNestedOneWithoutDonationsInputSchema)
}).strict();

export const DonationUncheckedCreateWithoutCampaignInputSchema: z.ZodType<Prisma.DonationUncheckedCreateWithoutCampaignInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  amount: z.number(),
  anonymous: z.boolean().optional()
}).strict();

export const DonationCreateOrConnectWithoutCampaignInputSchema: z.ZodType<Prisma.DonationCreateOrConnectWithoutCampaignInput> = z.object({
  where: z.lazy(() => DonationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DonationCreateWithoutCampaignInputSchema),z.lazy(() => DonationUncheckedCreateWithoutCampaignInputSchema) ]),
}).strict();

export const DonationCreateManyCampaignInputEnvelopeSchema: z.ZodType<Prisma.DonationCreateManyCampaignInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DonationCreateManyCampaignInputSchema),z.lazy(() => DonationCreateManyCampaignInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const WithdrawalRequestCreateWithoutCampaignInputSchema: z.ZodType<Prisma.WithdrawalRequestCreateWithoutCampaignInput> = z.object({
  id: z.string().optional(),
  amount: z.number(),
  createdAt: z.coerce.date().optional(),
  transitNumber: z.number(),
  institutionNumber: z.number(),
  accountNumber: z.number(),
  approved: z.boolean().optional()
}).strict();

export const WithdrawalRequestUncheckedCreateWithoutCampaignInputSchema: z.ZodType<Prisma.WithdrawalRequestUncheckedCreateWithoutCampaignInput> = z.object({
  id: z.string().optional(),
  amount: z.number(),
  createdAt: z.coerce.date().optional(),
  transitNumber: z.number(),
  institutionNumber: z.number(),
  accountNumber: z.number(),
  approved: z.boolean().optional()
}).strict();

export const WithdrawalRequestCreateOrConnectWithoutCampaignInputSchema: z.ZodType<Prisma.WithdrawalRequestCreateOrConnectWithoutCampaignInput> = z.object({
  where: z.lazy(() => WithdrawalRequestWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WithdrawalRequestCreateWithoutCampaignInputSchema),z.lazy(() => WithdrawalRequestUncheckedCreateWithoutCampaignInputSchema) ]),
}).strict();

export const WithdrawalRequestCreateManyCampaignInputEnvelopeSchema: z.ZodType<Prisma.WithdrawalRequestCreateManyCampaignInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => WithdrawalRequestCreateManyCampaignInputSchema),z.lazy(() => WithdrawalRequestCreateManyCampaignInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutCampaignsInputSchema: z.ZodType<Prisma.UserUpsertWithoutCampaignsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCampaignsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCampaignsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCampaignsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCampaignsInputSchema) ]),
}).strict();

export const UserUpdateWithoutCampaignsInputSchema: z.ZodType<Prisma.UserUpdateWithoutCampaignsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  stripeUser: z.lazy(() => StripeUserUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCampaignsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCampaignsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  stripeUser: z.lazy(() => StripeUserUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const DonationUpsertWithWhereUniqueWithoutCampaignInputSchema: z.ZodType<Prisma.DonationUpsertWithWhereUniqueWithoutCampaignInput> = z.object({
  where: z.lazy(() => DonationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DonationUpdateWithoutCampaignInputSchema),z.lazy(() => DonationUncheckedUpdateWithoutCampaignInputSchema) ]),
  create: z.union([ z.lazy(() => DonationCreateWithoutCampaignInputSchema),z.lazy(() => DonationUncheckedCreateWithoutCampaignInputSchema) ]),
}).strict();

export const DonationUpdateWithWhereUniqueWithoutCampaignInputSchema: z.ZodType<Prisma.DonationUpdateWithWhereUniqueWithoutCampaignInput> = z.object({
  where: z.lazy(() => DonationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DonationUpdateWithoutCampaignInputSchema),z.lazy(() => DonationUncheckedUpdateWithoutCampaignInputSchema) ]),
}).strict();

export const DonationUpdateManyWithWhereWithoutCampaignInputSchema: z.ZodType<Prisma.DonationUpdateManyWithWhereWithoutCampaignInput> = z.object({
  where: z.lazy(() => DonationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DonationUpdateManyMutationInputSchema),z.lazy(() => DonationUncheckedUpdateManyWithoutDonationsInputSchema) ]),
}).strict();

export const DonationScalarWhereInputSchema: z.ZodType<Prisma.DonationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DonationScalarWhereInputSchema),z.lazy(() => DonationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DonationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DonationScalarWhereInputSchema),z.lazy(() => DonationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  campaignId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  anonymous: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict();

export const WithdrawalRequestUpsertWithWhereUniqueWithoutCampaignInputSchema: z.ZodType<Prisma.WithdrawalRequestUpsertWithWhereUniqueWithoutCampaignInput> = z.object({
  where: z.lazy(() => WithdrawalRequestWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => WithdrawalRequestUpdateWithoutCampaignInputSchema),z.lazy(() => WithdrawalRequestUncheckedUpdateWithoutCampaignInputSchema) ]),
  create: z.union([ z.lazy(() => WithdrawalRequestCreateWithoutCampaignInputSchema),z.lazy(() => WithdrawalRequestUncheckedCreateWithoutCampaignInputSchema) ]),
}).strict();

export const WithdrawalRequestUpdateWithWhereUniqueWithoutCampaignInputSchema: z.ZodType<Prisma.WithdrawalRequestUpdateWithWhereUniqueWithoutCampaignInput> = z.object({
  where: z.lazy(() => WithdrawalRequestWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => WithdrawalRequestUpdateWithoutCampaignInputSchema),z.lazy(() => WithdrawalRequestUncheckedUpdateWithoutCampaignInputSchema) ]),
}).strict();

export const WithdrawalRequestUpdateManyWithWhereWithoutCampaignInputSchema: z.ZodType<Prisma.WithdrawalRequestUpdateManyWithWhereWithoutCampaignInput> = z.object({
  where: z.lazy(() => WithdrawalRequestScalarWhereInputSchema),
  data: z.union([ z.lazy(() => WithdrawalRequestUpdateManyMutationInputSchema),z.lazy(() => WithdrawalRequestUncheckedUpdateManyWithoutWithdrawalRequestsInputSchema) ]),
}).strict();

export const WithdrawalRequestScalarWhereInputSchema: z.ZodType<Prisma.WithdrawalRequestScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WithdrawalRequestScalarWhereInputSchema),z.lazy(() => WithdrawalRequestScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WithdrawalRequestScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WithdrawalRequestScalarWhereInputSchema),z.lazy(() => WithdrawalRequestScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  campaignId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  transitNumber: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  institutionNumber: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  accountNumber: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  approved: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict();

export const StripeUserCreateWithoutDonationsInputSchema: z.ZodType<Prisma.StripeUserCreateWithoutDonationsInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutStripeUserInputSchema).optional()
}).strict();

export const StripeUserUncheckedCreateWithoutDonationsInputSchema: z.ZodType<Prisma.StripeUserUncheckedCreateWithoutDonationsInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  userId: z.string().optional().nullable()
}).strict();

export const StripeUserCreateOrConnectWithoutDonationsInputSchema: z.ZodType<Prisma.StripeUserCreateOrConnectWithoutDonationsInput> = z.object({
  where: z.lazy(() => StripeUserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StripeUserCreateWithoutDonationsInputSchema),z.lazy(() => StripeUserUncheckedCreateWithoutDonationsInputSchema) ]),
}).strict();

export const CampaignCreateWithoutDonationsInputSchema: z.ZodType<Prisma.CampaignCreateWithoutDonationsInput> = z.object({
  id: z.string().optional(),
  userName: z.string().optional(),
  title: z.string(),
  story: z.string(),
  target: z.number(),
  type: z.lazy(() => CampaignTypeSchema),
  othersType: z.string().optional().nullable(),
  image: z.string(),
  endDate: z.coerce.date(),
  amountCollected: z.number().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCampaignsInputSchema),
  withdrawalRequests: z.lazy(() => WithdrawalRequestCreateNestedManyWithoutCampaignInputSchema).optional()
}).strict();

export const CampaignUncheckedCreateWithoutDonationsInputSchema: z.ZodType<Prisma.CampaignUncheckedCreateWithoutDonationsInput> = z.object({
  id: z.string().optional(),
  userName: z.string().optional(),
  userId: z.string(),
  title: z.string(),
  story: z.string(),
  target: z.number(),
  type: z.lazy(() => CampaignTypeSchema),
  othersType: z.string().optional().nullable(),
  image: z.string(),
  endDate: z.coerce.date(),
  amountCollected: z.number().optional(),
  withdrawalRequests: z.lazy(() => WithdrawalRequestUncheckedCreateNestedManyWithoutCampaignInputSchema).optional()
}).strict();

export const CampaignCreateOrConnectWithoutDonationsInputSchema: z.ZodType<Prisma.CampaignCreateOrConnectWithoutDonationsInput> = z.object({
  where: z.lazy(() => CampaignWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CampaignCreateWithoutDonationsInputSchema),z.lazy(() => CampaignUncheckedCreateWithoutDonationsInputSchema) ]),
}).strict();

export const StripeUserUpsertWithoutDonationsInputSchema: z.ZodType<Prisma.StripeUserUpsertWithoutDonationsInput> = z.object({
  update: z.union([ z.lazy(() => StripeUserUpdateWithoutDonationsInputSchema),z.lazy(() => StripeUserUncheckedUpdateWithoutDonationsInputSchema) ]),
  create: z.union([ z.lazy(() => StripeUserCreateWithoutDonationsInputSchema),z.lazy(() => StripeUserUncheckedCreateWithoutDonationsInputSchema) ]),
}).strict();

export const StripeUserUpdateWithoutDonationsInputSchema: z.ZodType<Prisma.StripeUserUpdateWithoutDonationsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneWithoutStripeUserNestedInputSchema).optional()
}).strict();

export const StripeUserUncheckedUpdateWithoutDonationsInputSchema: z.ZodType<Prisma.StripeUserUncheckedUpdateWithoutDonationsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CampaignUpsertWithoutDonationsInputSchema: z.ZodType<Prisma.CampaignUpsertWithoutDonationsInput> = z.object({
  update: z.union([ z.lazy(() => CampaignUpdateWithoutDonationsInputSchema),z.lazy(() => CampaignUncheckedUpdateWithoutDonationsInputSchema) ]),
  create: z.union([ z.lazy(() => CampaignCreateWithoutDonationsInputSchema),z.lazy(() => CampaignUncheckedCreateWithoutDonationsInputSchema) ]),
}).strict();

export const CampaignUpdateWithoutDonationsInputSchema: z.ZodType<Prisma.CampaignUpdateWithoutDonationsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  story: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  target: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => CampaignTypeSchema),z.lazy(() => EnumCampaignTypeFieldUpdateOperationsInputSchema) ]).optional(),
  othersType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amountCollected: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCampaignsNestedInputSchema).optional(),
  withdrawalRequests: z.lazy(() => WithdrawalRequestUpdateManyWithoutCampaignNestedInputSchema).optional()
}).strict();

export const CampaignUncheckedUpdateWithoutDonationsInputSchema: z.ZodType<Prisma.CampaignUncheckedUpdateWithoutDonationsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  story: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  target: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => CampaignTypeSchema),z.lazy(() => EnumCampaignTypeFieldUpdateOperationsInputSchema) ]).optional(),
  othersType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amountCollected: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  withdrawalRequests: z.lazy(() => WithdrawalRequestUncheckedUpdateManyWithoutCampaignNestedInputSchema).optional()
}).strict();

export const DonationCreateWithoutUserInputSchema: z.ZodType<Prisma.DonationCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  amount: z.number(),
  anonymous: z.boolean().optional(),
  campaign: z.lazy(() => CampaignCreateNestedOneWithoutDonationsInputSchema)
}).strict();

export const DonationUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.DonationUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  campaignId: z.string(),
  amount: z.number(),
  anonymous: z.boolean().optional()
}).strict();

export const DonationCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.DonationCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => DonationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DonationCreateWithoutUserInputSchema),z.lazy(() => DonationUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const DonationCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.DonationCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DonationCreateManyUserInputSchema),z.lazy(() => DonationCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserCreateWithoutStripeUserInputSchema: z.ZodType<Prisma.UserCreateWithoutStripeUserInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  campaigns: z.lazy(() => CampaignCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutStripeUserInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutStripeUserInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  campaigns: z.lazy(() => CampaignUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutStripeUserInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutStripeUserInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutStripeUserInputSchema),z.lazy(() => UserUncheckedCreateWithoutStripeUserInputSchema) ]),
}).strict();

export const DonationUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.DonationUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => DonationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DonationUpdateWithoutUserInputSchema),z.lazy(() => DonationUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => DonationCreateWithoutUserInputSchema),z.lazy(() => DonationUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const DonationUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.DonationUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => DonationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DonationUpdateWithoutUserInputSchema),z.lazy(() => DonationUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const DonationUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.DonationUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => DonationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DonationUpdateManyMutationInputSchema),z.lazy(() => DonationUncheckedUpdateManyWithoutDonationsInputSchema) ]),
}).strict();

export const UserUpsertWithoutStripeUserInputSchema: z.ZodType<Prisma.UserUpsertWithoutStripeUserInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutStripeUserInputSchema),z.lazy(() => UserUncheckedUpdateWithoutStripeUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutStripeUserInputSchema),z.lazy(() => UserUncheckedCreateWithoutStripeUserInputSchema) ]),
}).strict();

export const UserUpdateWithoutStripeUserInputSchema: z.ZodType<Prisma.UserUpdateWithoutStripeUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  campaigns: z.lazy(() => CampaignUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutStripeUserInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutStripeUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  campaigns: z.lazy(() => CampaignUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const CampaignCreateWithoutWithdrawalRequestsInputSchema: z.ZodType<Prisma.CampaignCreateWithoutWithdrawalRequestsInput> = z.object({
  id: z.string().optional(),
  userName: z.string().optional(),
  title: z.string(),
  story: z.string(),
  target: z.number(),
  type: z.lazy(() => CampaignTypeSchema),
  othersType: z.string().optional().nullable(),
  image: z.string(),
  endDate: z.coerce.date(),
  amountCollected: z.number().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCampaignsInputSchema),
  donations: z.lazy(() => DonationCreateNestedManyWithoutCampaignInputSchema).optional()
}).strict();

export const CampaignUncheckedCreateWithoutWithdrawalRequestsInputSchema: z.ZodType<Prisma.CampaignUncheckedCreateWithoutWithdrawalRequestsInput> = z.object({
  id: z.string().optional(),
  userName: z.string().optional(),
  userId: z.string(),
  title: z.string(),
  story: z.string(),
  target: z.number(),
  type: z.lazy(() => CampaignTypeSchema),
  othersType: z.string().optional().nullable(),
  image: z.string(),
  endDate: z.coerce.date(),
  amountCollected: z.number().optional(),
  donations: z.lazy(() => DonationUncheckedCreateNestedManyWithoutCampaignInputSchema).optional()
}).strict();

export const CampaignCreateOrConnectWithoutWithdrawalRequestsInputSchema: z.ZodType<Prisma.CampaignCreateOrConnectWithoutWithdrawalRequestsInput> = z.object({
  where: z.lazy(() => CampaignWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CampaignCreateWithoutWithdrawalRequestsInputSchema),z.lazy(() => CampaignUncheckedCreateWithoutWithdrawalRequestsInputSchema) ]),
}).strict();

export const CampaignUpsertWithoutWithdrawalRequestsInputSchema: z.ZodType<Prisma.CampaignUpsertWithoutWithdrawalRequestsInput> = z.object({
  update: z.union([ z.lazy(() => CampaignUpdateWithoutWithdrawalRequestsInputSchema),z.lazy(() => CampaignUncheckedUpdateWithoutWithdrawalRequestsInputSchema) ]),
  create: z.union([ z.lazy(() => CampaignCreateWithoutWithdrawalRequestsInputSchema),z.lazy(() => CampaignUncheckedCreateWithoutWithdrawalRequestsInputSchema) ]),
}).strict();

export const CampaignUpdateWithoutWithdrawalRequestsInputSchema: z.ZodType<Prisma.CampaignUpdateWithoutWithdrawalRequestsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  story: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  target: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => CampaignTypeSchema),z.lazy(() => EnumCampaignTypeFieldUpdateOperationsInputSchema) ]).optional(),
  othersType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amountCollected: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCampaignsNestedInputSchema).optional(),
  donations: z.lazy(() => DonationUpdateManyWithoutCampaignNestedInputSchema).optional()
}).strict();

export const CampaignUncheckedUpdateWithoutWithdrawalRequestsInputSchema: z.ZodType<Prisma.CampaignUncheckedUpdateWithoutWithdrawalRequestsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  story: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  target: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => CampaignTypeSchema),z.lazy(() => EnumCampaignTypeFieldUpdateOperationsInputSchema) ]).optional(),
  othersType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amountCollected: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  donations: z.lazy(() => DonationUncheckedUpdateManyWithoutCampaignNestedInputSchema).optional()
}).strict();

export const CampaignCreateManyUserInputSchema: z.ZodType<Prisma.CampaignCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  userName: z.string().optional(),
  title: z.string(),
  story: z.string(),
  target: z.number(),
  type: z.lazy(() => CampaignTypeSchema),
  othersType: z.string().optional().nullable(),
  image: z.string(),
  endDate: z.coerce.date(),
  amountCollected: z.number().optional()
}).strict();

export const CampaignUpdateWithoutUserInputSchema: z.ZodType<Prisma.CampaignUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  story: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  target: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => CampaignTypeSchema),z.lazy(() => EnumCampaignTypeFieldUpdateOperationsInputSchema) ]).optional(),
  othersType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amountCollected: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  donations: z.lazy(() => DonationUpdateManyWithoutCampaignNestedInputSchema).optional(),
  withdrawalRequests: z.lazy(() => WithdrawalRequestUpdateManyWithoutCampaignNestedInputSchema).optional()
}).strict();

export const CampaignUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.CampaignUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  story: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  target: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => CampaignTypeSchema),z.lazy(() => EnumCampaignTypeFieldUpdateOperationsInputSchema) ]).optional(),
  othersType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amountCollected: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  donations: z.lazy(() => DonationUncheckedUpdateManyWithoutCampaignNestedInputSchema).optional(),
  withdrawalRequests: z.lazy(() => WithdrawalRequestUncheckedUpdateManyWithoutCampaignNestedInputSchema).optional()
}).strict();

export const CampaignUncheckedUpdateManyWithoutCampaignsInputSchema: z.ZodType<Prisma.CampaignUncheckedUpdateManyWithoutCampaignsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  story: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  target: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => CampaignTypeSchema),z.lazy(() => EnumCampaignTypeFieldUpdateOperationsInputSchema) ]).optional(),
  othersType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amountCollected: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DonationCreateManyCampaignInputSchema: z.ZodType<Prisma.DonationCreateManyCampaignInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  amount: z.number(),
  anonymous: z.boolean().optional()
}).strict();

export const WithdrawalRequestCreateManyCampaignInputSchema: z.ZodType<Prisma.WithdrawalRequestCreateManyCampaignInput> = z.object({
  id: z.string().uuid().optional(),
  amount: z.number(),
  createdAt: z.coerce.date().optional(),
  transitNumber: z.number().int(),
  institutionNumber: z.number().int(),
  accountNumber: z.number().int(),
  approved: z.boolean().optional()
}).strict();

export const DonationUpdateWithoutCampaignInputSchema: z.ZodType<Prisma.DonationUpdateWithoutCampaignInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  anonymous: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => StripeUserUpdateOneRequiredWithoutDonationsNestedInputSchema).optional()
}).strict();

export const DonationUncheckedUpdateWithoutCampaignInputSchema: z.ZodType<Prisma.DonationUncheckedUpdateWithoutCampaignInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  anonymous: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DonationUncheckedUpdateManyWithoutDonationsInputSchema: z.ZodType<Prisma.DonationUncheckedUpdateManyWithoutDonationsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  anonymous: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WithdrawalRequestUpdateWithoutCampaignInputSchema: z.ZodType<Prisma.WithdrawalRequestUpdateWithoutCampaignInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  transitNumber: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  institutionNumber: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accountNumber: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  approved: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WithdrawalRequestUncheckedUpdateWithoutCampaignInputSchema: z.ZodType<Prisma.WithdrawalRequestUncheckedUpdateWithoutCampaignInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  transitNumber: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  institutionNumber: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accountNumber: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  approved: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WithdrawalRequestUncheckedUpdateManyWithoutWithdrawalRequestsInputSchema: z.ZodType<Prisma.WithdrawalRequestUncheckedUpdateManyWithoutWithdrawalRequestsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  transitNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  institutionNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accountNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  approved: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DonationCreateManyUserInputSchema: z.ZodType<Prisma.DonationCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  campaignId: z.string(),
  amount: z.number(),
  anonymous: z.boolean().optional()
}).strict();

export const DonationUpdateWithoutUserInputSchema: z.ZodType<Prisma.DonationUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  anonymous: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  campaign: z.lazy(() => CampaignUpdateOneRequiredWithoutDonationsNestedInputSchema).optional()
}).strict();

export const DonationUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.DonationUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  campaignId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  anonymous: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const CampaignFindFirstArgsSchema: z.ZodType<Prisma.CampaignFindFirstArgs> = z.object({
  select: CampaignSelectSchema.optional(),
  include: CampaignIncludeSchema.optional(),
  where: CampaignWhereInputSchema.optional(),
  orderBy: z.union([ CampaignOrderByWithRelationInputSchema.array(),CampaignOrderByWithRelationInputSchema ]).optional(),
  cursor: CampaignWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CampaignScalarFieldEnumSchema.array().optional(),
}).strict()

export const CampaignFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CampaignFindFirstOrThrowArgs> = z.object({
  select: CampaignSelectSchema.optional(),
  include: CampaignIncludeSchema.optional(),
  where: CampaignWhereInputSchema.optional(),
  orderBy: z.union([ CampaignOrderByWithRelationInputSchema.array(),CampaignOrderByWithRelationInputSchema ]).optional(),
  cursor: CampaignWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CampaignScalarFieldEnumSchema.array().optional(),
}).strict()

export const CampaignFindManyArgsSchema: z.ZodType<Prisma.CampaignFindManyArgs> = z.object({
  select: CampaignSelectSchema.optional(),
  include: CampaignIncludeSchema.optional(),
  where: CampaignWhereInputSchema.optional(),
  orderBy: z.union([ CampaignOrderByWithRelationInputSchema.array(),CampaignOrderByWithRelationInputSchema ]).optional(),
  cursor: CampaignWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CampaignScalarFieldEnumSchema.array().optional(),
}).strict()

export const CampaignAggregateArgsSchema: z.ZodType<Prisma.CampaignAggregateArgs> = z.object({
  where: CampaignWhereInputSchema.optional(),
  orderBy: z.union([ CampaignOrderByWithRelationInputSchema.array(),CampaignOrderByWithRelationInputSchema ]).optional(),
  cursor: CampaignWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CampaignGroupByArgsSchema: z.ZodType<Prisma.CampaignGroupByArgs> = z.object({
  where: CampaignWhereInputSchema.optional(),
  orderBy: z.union([ CampaignOrderByWithAggregationInputSchema.array(),CampaignOrderByWithAggregationInputSchema ]).optional(),
  by: CampaignScalarFieldEnumSchema.array(),
  having: CampaignScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CampaignFindUniqueArgsSchema: z.ZodType<Prisma.CampaignFindUniqueArgs> = z.object({
  select: CampaignSelectSchema.optional(),
  include: CampaignIncludeSchema.optional(),
  where: CampaignWhereUniqueInputSchema,
}).strict()

export const CampaignFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CampaignFindUniqueOrThrowArgs> = z.object({
  select: CampaignSelectSchema.optional(),
  include: CampaignIncludeSchema.optional(),
  where: CampaignWhereUniqueInputSchema,
}).strict()

export const DonationFindFirstArgsSchema: z.ZodType<Prisma.DonationFindFirstArgs> = z.object({
  select: DonationSelectSchema.optional(),
  include: DonationIncludeSchema.optional(),
  where: DonationWhereInputSchema.optional(),
  orderBy: z.union([ DonationOrderByWithRelationInputSchema.array(),DonationOrderByWithRelationInputSchema ]).optional(),
  cursor: DonationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: DonationScalarFieldEnumSchema.array().optional(),
}).strict()

export const DonationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DonationFindFirstOrThrowArgs> = z.object({
  select: DonationSelectSchema.optional(),
  include: DonationIncludeSchema.optional(),
  where: DonationWhereInputSchema.optional(),
  orderBy: z.union([ DonationOrderByWithRelationInputSchema.array(),DonationOrderByWithRelationInputSchema ]).optional(),
  cursor: DonationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: DonationScalarFieldEnumSchema.array().optional(),
}).strict()

export const DonationFindManyArgsSchema: z.ZodType<Prisma.DonationFindManyArgs> = z.object({
  select: DonationSelectSchema.optional(),
  include: DonationIncludeSchema.optional(),
  where: DonationWhereInputSchema.optional(),
  orderBy: z.union([ DonationOrderByWithRelationInputSchema.array(),DonationOrderByWithRelationInputSchema ]).optional(),
  cursor: DonationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: DonationScalarFieldEnumSchema.array().optional(),
}).strict()

export const DonationAggregateArgsSchema: z.ZodType<Prisma.DonationAggregateArgs> = z.object({
  where: DonationWhereInputSchema.optional(),
  orderBy: z.union([ DonationOrderByWithRelationInputSchema.array(),DonationOrderByWithRelationInputSchema ]).optional(),
  cursor: DonationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const DonationGroupByArgsSchema: z.ZodType<Prisma.DonationGroupByArgs> = z.object({
  where: DonationWhereInputSchema.optional(),
  orderBy: z.union([ DonationOrderByWithAggregationInputSchema.array(),DonationOrderByWithAggregationInputSchema ]).optional(),
  by: DonationScalarFieldEnumSchema.array(),
  having: DonationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const DonationFindUniqueArgsSchema: z.ZodType<Prisma.DonationFindUniqueArgs> = z.object({
  select: DonationSelectSchema.optional(),
  include: DonationIncludeSchema.optional(),
  where: DonationWhereUniqueInputSchema,
}).strict()

export const DonationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DonationFindUniqueOrThrowArgs> = z.object({
  select: DonationSelectSchema.optional(),
  include: DonationIncludeSchema.optional(),
  where: DonationWhereUniqueInputSchema,
}).strict()

export const StripeUserFindFirstArgsSchema: z.ZodType<Prisma.StripeUserFindFirstArgs> = z.object({
  select: StripeUserSelectSchema.optional(),
  include: StripeUserIncludeSchema.optional(),
  where: StripeUserWhereInputSchema.optional(),
  orderBy: z.union([ StripeUserOrderByWithRelationInputSchema.array(),StripeUserOrderByWithRelationInputSchema ]).optional(),
  cursor: StripeUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: StripeUserScalarFieldEnumSchema.array().optional(),
}).strict()

export const StripeUserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StripeUserFindFirstOrThrowArgs> = z.object({
  select: StripeUserSelectSchema.optional(),
  include: StripeUserIncludeSchema.optional(),
  where: StripeUserWhereInputSchema.optional(),
  orderBy: z.union([ StripeUserOrderByWithRelationInputSchema.array(),StripeUserOrderByWithRelationInputSchema ]).optional(),
  cursor: StripeUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: StripeUserScalarFieldEnumSchema.array().optional(),
}).strict()

export const StripeUserFindManyArgsSchema: z.ZodType<Prisma.StripeUserFindManyArgs> = z.object({
  select: StripeUserSelectSchema.optional(),
  include: StripeUserIncludeSchema.optional(),
  where: StripeUserWhereInputSchema.optional(),
  orderBy: z.union([ StripeUserOrderByWithRelationInputSchema.array(),StripeUserOrderByWithRelationInputSchema ]).optional(),
  cursor: StripeUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: StripeUserScalarFieldEnumSchema.array().optional(),
}).strict()

export const StripeUserAggregateArgsSchema: z.ZodType<Prisma.StripeUserAggregateArgs> = z.object({
  where: StripeUserWhereInputSchema.optional(),
  orderBy: z.union([ StripeUserOrderByWithRelationInputSchema.array(),StripeUserOrderByWithRelationInputSchema ]).optional(),
  cursor: StripeUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const StripeUserGroupByArgsSchema: z.ZodType<Prisma.StripeUserGroupByArgs> = z.object({
  where: StripeUserWhereInputSchema.optional(),
  orderBy: z.union([ StripeUserOrderByWithAggregationInputSchema.array(),StripeUserOrderByWithAggregationInputSchema ]).optional(),
  by: StripeUserScalarFieldEnumSchema.array(),
  having: StripeUserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const StripeUserFindUniqueArgsSchema: z.ZodType<Prisma.StripeUserFindUniqueArgs> = z.object({
  select: StripeUserSelectSchema.optional(),
  include: StripeUserIncludeSchema.optional(),
  where: StripeUserWhereUniqueInputSchema,
}).strict()

export const StripeUserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StripeUserFindUniqueOrThrowArgs> = z.object({
  select: StripeUserSelectSchema.optional(),
  include: StripeUserIncludeSchema.optional(),
  where: StripeUserWhereUniqueInputSchema,
}).strict()

export const WithdrawalRequestFindFirstArgsSchema: z.ZodType<Prisma.WithdrawalRequestFindFirstArgs> = z.object({
  select: WithdrawalRequestSelectSchema.optional(),
  include: WithdrawalRequestIncludeSchema.optional(),
  where: WithdrawalRequestWhereInputSchema.optional(),
  orderBy: z.union([ WithdrawalRequestOrderByWithRelationInputSchema.array(),WithdrawalRequestOrderByWithRelationInputSchema ]).optional(),
  cursor: WithdrawalRequestWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: WithdrawalRequestScalarFieldEnumSchema.array().optional(),
}).strict()

export const WithdrawalRequestFindFirstOrThrowArgsSchema: z.ZodType<Prisma.WithdrawalRequestFindFirstOrThrowArgs> = z.object({
  select: WithdrawalRequestSelectSchema.optional(),
  include: WithdrawalRequestIncludeSchema.optional(),
  where: WithdrawalRequestWhereInputSchema.optional(),
  orderBy: z.union([ WithdrawalRequestOrderByWithRelationInputSchema.array(),WithdrawalRequestOrderByWithRelationInputSchema ]).optional(),
  cursor: WithdrawalRequestWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: WithdrawalRequestScalarFieldEnumSchema.array().optional(),
}).strict()

export const WithdrawalRequestFindManyArgsSchema: z.ZodType<Prisma.WithdrawalRequestFindManyArgs> = z.object({
  select: WithdrawalRequestSelectSchema.optional(),
  include: WithdrawalRequestIncludeSchema.optional(),
  where: WithdrawalRequestWhereInputSchema.optional(),
  orderBy: z.union([ WithdrawalRequestOrderByWithRelationInputSchema.array(),WithdrawalRequestOrderByWithRelationInputSchema ]).optional(),
  cursor: WithdrawalRequestWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: WithdrawalRequestScalarFieldEnumSchema.array().optional(),
}).strict()

export const WithdrawalRequestAggregateArgsSchema: z.ZodType<Prisma.WithdrawalRequestAggregateArgs> = z.object({
  where: WithdrawalRequestWhereInputSchema.optional(),
  orderBy: z.union([ WithdrawalRequestOrderByWithRelationInputSchema.array(),WithdrawalRequestOrderByWithRelationInputSchema ]).optional(),
  cursor: WithdrawalRequestWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const WithdrawalRequestGroupByArgsSchema: z.ZodType<Prisma.WithdrawalRequestGroupByArgs> = z.object({
  where: WithdrawalRequestWhereInputSchema.optional(),
  orderBy: z.union([ WithdrawalRequestOrderByWithAggregationInputSchema.array(),WithdrawalRequestOrderByWithAggregationInputSchema ]).optional(),
  by: WithdrawalRequestScalarFieldEnumSchema.array(),
  having: WithdrawalRequestScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const WithdrawalRequestFindUniqueArgsSchema: z.ZodType<Prisma.WithdrawalRequestFindUniqueArgs> = z.object({
  select: WithdrawalRequestSelectSchema.optional(),
  include: WithdrawalRequestIncludeSchema.optional(),
  where: WithdrawalRequestWhereUniqueInputSchema,
}).strict()

export const WithdrawalRequestFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.WithdrawalRequestFindUniqueOrThrowArgs> = z.object({
  select: WithdrawalRequestSelectSchema.optional(),
  include: WithdrawalRequestIncludeSchema.optional(),
  where: WithdrawalRequestWhereUniqueInputSchema,
}).strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict()

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict()

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict()

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict()

export const CampaignCreateArgsSchema: z.ZodType<Prisma.CampaignCreateArgs> = z.object({
  select: CampaignSelectSchema.optional(),
  include: CampaignIncludeSchema.optional(),
  data: z.union([ CampaignCreateInputSchema,CampaignUncheckedCreateInputSchema ]),
}).strict()

export const CampaignUpsertArgsSchema: z.ZodType<Prisma.CampaignUpsertArgs> = z.object({
  select: CampaignSelectSchema.optional(),
  include: CampaignIncludeSchema.optional(),
  where: CampaignWhereUniqueInputSchema,
  create: z.union([ CampaignCreateInputSchema,CampaignUncheckedCreateInputSchema ]),
  update: z.union([ CampaignUpdateInputSchema,CampaignUncheckedUpdateInputSchema ]),
}).strict()

export const CampaignCreateManyArgsSchema: z.ZodType<Prisma.CampaignCreateManyArgs> = z.object({
  data: z.union([ CampaignCreateManyInputSchema,CampaignCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const CampaignDeleteArgsSchema: z.ZodType<Prisma.CampaignDeleteArgs> = z.object({
  select: CampaignSelectSchema.optional(),
  include: CampaignIncludeSchema.optional(),
  where: CampaignWhereUniqueInputSchema,
}).strict()

export const CampaignUpdateArgsSchema: z.ZodType<Prisma.CampaignUpdateArgs> = z.object({
  select: CampaignSelectSchema.optional(),
  include: CampaignIncludeSchema.optional(),
  data: z.union([ CampaignUpdateInputSchema,CampaignUncheckedUpdateInputSchema ]),
  where: CampaignWhereUniqueInputSchema,
}).strict()

export const CampaignUpdateManyArgsSchema: z.ZodType<Prisma.CampaignUpdateManyArgs> = z.object({
  data: z.union([ CampaignUpdateManyMutationInputSchema,CampaignUncheckedUpdateManyInputSchema ]),
  where: CampaignWhereInputSchema.optional(),
}).strict()

export const CampaignDeleteManyArgsSchema: z.ZodType<Prisma.CampaignDeleteManyArgs> = z.object({
  where: CampaignWhereInputSchema.optional(),
}).strict()

export const DonationCreateArgsSchema: z.ZodType<Prisma.DonationCreateArgs> = z.object({
  select: DonationSelectSchema.optional(),
  include: DonationIncludeSchema.optional(),
  data: z.union([ DonationCreateInputSchema,DonationUncheckedCreateInputSchema ]),
}).strict()

export const DonationUpsertArgsSchema: z.ZodType<Prisma.DonationUpsertArgs> = z.object({
  select: DonationSelectSchema.optional(),
  include: DonationIncludeSchema.optional(),
  where: DonationWhereUniqueInputSchema,
  create: z.union([ DonationCreateInputSchema,DonationUncheckedCreateInputSchema ]),
  update: z.union([ DonationUpdateInputSchema,DonationUncheckedUpdateInputSchema ]),
}).strict()

export const DonationCreateManyArgsSchema: z.ZodType<Prisma.DonationCreateManyArgs> = z.object({
  data: z.union([ DonationCreateManyInputSchema,DonationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const DonationDeleteArgsSchema: z.ZodType<Prisma.DonationDeleteArgs> = z.object({
  select: DonationSelectSchema.optional(),
  include: DonationIncludeSchema.optional(),
  where: DonationWhereUniqueInputSchema,
}).strict()

export const DonationUpdateArgsSchema: z.ZodType<Prisma.DonationUpdateArgs> = z.object({
  select: DonationSelectSchema.optional(),
  include: DonationIncludeSchema.optional(),
  data: z.union([ DonationUpdateInputSchema,DonationUncheckedUpdateInputSchema ]),
  where: DonationWhereUniqueInputSchema,
}).strict()

export const DonationUpdateManyArgsSchema: z.ZodType<Prisma.DonationUpdateManyArgs> = z.object({
  data: z.union([ DonationUpdateManyMutationInputSchema,DonationUncheckedUpdateManyInputSchema ]),
  where: DonationWhereInputSchema.optional(),
}).strict()

export const DonationDeleteManyArgsSchema: z.ZodType<Prisma.DonationDeleteManyArgs> = z.object({
  where: DonationWhereInputSchema.optional(),
}).strict()

export const StripeUserCreateArgsSchema: z.ZodType<Prisma.StripeUserCreateArgs> = z.object({
  select: StripeUserSelectSchema.optional(),
  include: StripeUserIncludeSchema.optional(),
  data: z.union([ StripeUserCreateInputSchema,StripeUserUncheckedCreateInputSchema ]),
}).strict()

export const StripeUserUpsertArgsSchema: z.ZodType<Prisma.StripeUserUpsertArgs> = z.object({
  select: StripeUserSelectSchema.optional(),
  include: StripeUserIncludeSchema.optional(),
  where: StripeUserWhereUniqueInputSchema,
  create: z.union([ StripeUserCreateInputSchema,StripeUserUncheckedCreateInputSchema ]),
  update: z.union([ StripeUserUpdateInputSchema,StripeUserUncheckedUpdateInputSchema ]),
}).strict()

export const StripeUserCreateManyArgsSchema: z.ZodType<Prisma.StripeUserCreateManyArgs> = z.object({
  data: z.union([ StripeUserCreateManyInputSchema,StripeUserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const StripeUserDeleteArgsSchema: z.ZodType<Prisma.StripeUserDeleteArgs> = z.object({
  select: StripeUserSelectSchema.optional(),
  include: StripeUserIncludeSchema.optional(),
  where: StripeUserWhereUniqueInputSchema,
}).strict()

export const StripeUserUpdateArgsSchema: z.ZodType<Prisma.StripeUserUpdateArgs> = z.object({
  select: StripeUserSelectSchema.optional(),
  include: StripeUserIncludeSchema.optional(),
  data: z.union([ StripeUserUpdateInputSchema,StripeUserUncheckedUpdateInputSchema ]),
  where: StripeUserWhereUniqueInputSchema,
}).strict()

export const StripeUserUpdateManyArgsSchema: z.ZodType<Prisma.StripeUserUpdateManyArgs> = z.object({
  data: z.union([ StripeUserUpdateManyMutationInputSchema,StripeUserUncheckedUpdateManyInputSchema ]),
  where: StripeUserWhereInputSchema.optional(),
}).strict()

export const StripeUserDeleteManyArgsSchema: z.ZodType<Prisma.StripeUserDeleteManyArgs> = z.object({
  where: StripeUserWhereInputSchema.optional(),
}).strict()

export const WithdrawalRequestCreateArgsSchema: z.ZodType<Prisma.WithdrawalRequestCreateArgs> = z.object({
  select: WithdrawalRequestSelectSchema.optional(),
  include: WithdrawalRequestIncludeSchema.optional(),
  data: z.union([ WithdrawalRequestCreateInputSchema,WithdrawalRequestUncheckedCreateInputSchema ]),
}).strict()

export const WithdrawalRequestUpsertArgsSchema: z.ZodType<Prisma.WithdrawalRequestUpsertArgs> = z.object({
  select: WithdrawalRequestSelectSchema.optional(),
  include: WithdrawalRequestIncludeSchema.optional(),
  where: WithdrawalRequestWhereUniqueInputSchema,
  create: z.union([ WithdrawalRequestCreateInputSchema,WithdrawalRequestUncheckedCreateInputSchema ]),
  update: z.union([ WithdrawalRequestUpdateInputSchema,WithdrawalRequestUncheckedUpdateInputSchema ]),
}).strict()

export const WithdrawalRequestCreateManyArgsSchema: z.ZodType<Prisma.WithdrawalRequestCreateManyArgs> = z.object({
  data: z.union([ WithdrawalRequestCreateManyInputSchema,WithdrawalRequestCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const WithdrawalRequestDeleteArgsSchema: z.ZodType<Prisma.WithdrawalRequestDeleteArgs> = z.object({
  select: WithdrawalRequestSelectSchema.optional(),
  include: WithdrawalRequestIncludeSchema.optional(),
  where: WithdrawalRequestWhereUniqueInputSchema,
}).strict()

export const WithdrawalRequestUpdateArgsSchema: z.ZodType<Prisma.WithdrawalRequestUpdateArgs> = z.object({
  select: WithdrawalRequestSelectSchema.optional(),
  include: WithdrawalRequestIncludeSchema.optional(),
  data: z.union([ WithdrawalRequestUpdateInputSchema,WithdrawalRequestUncheckedUpdateInputSchema ]),
  where: WithdrawalRequestWhereUniqueInputSchema,
}).strict()

export const WithdrawalRequestUpdateManyArgsSchema: z.ZodType<Prisma.WithdrawalRequestUpdateManyArgs> = z.object({
  data: z.union([ WithdrawalRequestUpdateManyMutationInputSchema,WithdrawalRequestUncheckedUpdateManyInputSchema ]),
  where: WithdrawalRequestWhereInputSchema.optional(),
}).strict()

export const WithdrawalRequestDeleteManyArgsSchema: z.ZodType<Prisma.WithdrawalRequestDeleteManyArgs> = z.object({
  where: WithdrawalRequestWhereInputSchema.optional(),
}).strict()