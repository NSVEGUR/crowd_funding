import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const CampaignScalarFieldEnumSchema = z.enum(['id','userId','title','story','target','image','endDate','amountCollected','donators','donations']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','role','customerId','createdAt','updatedAt']);

export const RoleSchema = z.enum(['ADMIN','USER']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

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
  customerId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// CAMPAIGN SCHEMA
/////////////////////////////////////////

export const CampaignSchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  title: z.string(),
  story: z.string(),
  target: z.number(),
  image: z.string(),
  endDate: z.coerce.date(),
  amountCollected: z.number(),
  donators: z.string().array(),
  donations: z.number().array(),
})

export type Campaign = z.infer<typeof CampaignSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
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
  role: z.boolean().optional(),
  customerId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  campaigns: z.union([z.boolean(),z.lazy(() => CampaignFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CAMPAIGN
//------------------------------------------------------

export const CampaignIncludeSchema: z.ZodType<Prisma.CampaignInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const CampaignArgsSchema: z.ZodType<Prisma.CampaignArgs> = z.object({
  select: z.lazy(() => CampaignSelectSchema).optional(),
  include: z.lazy(() => CampaignIncludeSchema).optional(),
}).strict();

export const CampaignSelectSchema: z.ZodType<Prisma.CampaignSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  title: z.boolean().optional(),
  story: z.boolean().optional(),
  target: z.boolean().optional(),
  image: z.boolean().optional(),
  endDate: z.boolean().optional(),
  amountCollected: z.boolean().optional(),
  donators: z.boolean().optional(),
  donations: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
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
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  customerId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  campaigns: z.lazy(() => CampaignListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  customerId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  campaigns: z.lazy(() => CampaignOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional(),
  customerId: z.string().optional()
}).strict();

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  customerId: z.lazy(() => SortOrderSchema).optional(),
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
  role: z.union([ z.lazy(() => EnumRoleWithAggregatesFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  customerId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CampaignWhereInputSchema: z.ZodType<Prisma.CampaignWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CampaignWhereInputSchema),z.lazy(() => CampaignWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CampaignWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CampaignWhereInputSchema),z.lazy(() => CampaignWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  story: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  target: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  image: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  amountCollected: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  donators: z.lazy(() => StringNullableListFilterSchema).optional(),
  donations: z.lazy(() => FloatNullableListFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const CampaignOrderByWithRelationInputSchema: z.ZodType<Prisma.CampaignOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  story: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  amountCollected: z.lazy(() => SortOrderSchema).optional(),
  donators: z.lazy(() => SortOrderSchema).optional(),
  donations: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const CampaignWhereUniqueInputSchema: z.ZodType<Prisma.CampaignWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const CampaignOrderByWithAggregationInputSchema: z.ZodType<Prisma.CampaignOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  story: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  amountCollected: z.lazy(() => SortOrderSchema).optional(),
  donators: z.lazy(() => SortOrderSchema).optional(),
  donations: z.lazy(() => SortOrderSchema).optional(),
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
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  story: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  target: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  image: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  amountCollected: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  donators: z.lazy(() => StringNullableListFilterSchema).optional(),
  donations: z.lazy(() => FloatNullableListFilterSchema).optional()
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  customerId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  campaigns: z.lazy(() => CampaignCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  customerId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  campaigns: z.lazy(() => CampaignUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  customerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  campaigns: z.lazy(() => CampaignUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  customerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  campaigns: z.lazy(() => CampaignUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  customerId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  customerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  customerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CampaignCreateInputSchema: z.ZodType<Prisma.CampaignCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  story: z.string(),
  target: z.number(),
  image: z.string(),
  endDate: z.coerce.date(),
  amountCollected: z.number().optional(),
  donators: z.union([ z.lazy(() => CampaignCreatedonatorsInputSchema),z.string().array() ]).optional(),
  donations: z.union([ z.lazy(() => CampaignCreatedonationsInputSchema),z.number().array() ]).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCampaignsInputSchema)
}).strict();

export const CampaignUncheckedCreateInputSchema: z.ZodType<Prisma.CampaignUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  title: z.string(),
  story: z.string(),
  target: z.number(),
  image: z.string(),
  endDate: z.coerce.date(),
  amountCollected: z.number().optional(),
  donators: z.union([ z.lazy(() => CampaignCreatedonatorsInputSchema),z.string().array() ]).optional(),
  donations: z.union([ z.lazy(() => CampaignCreatedonationsInputSchema),z.number().array() ]).optional(),
}).strict();

export const CampaignUpdateInputSchema: z.ZodType<Prisma.CampaignUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  story: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  target: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amountCollected: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  donators: z.union([ z.lazy(() => CampaignUpdatedonatorsInputSchema),z.string().array() ]).optional(),
  donations: z.union([ z.lazy(() => CampaignUpdatedonationsInputSchema),z.number().array() ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCampaignsNestedInputSchema).optional()
}).strict();

export const CampaignUncheckedUpdateInputSchema: z.ZodType<Prisma.CampaignUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  story: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  target: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amountCollected: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  donators: z.union([ z.lazy(() => CampaignUpdatedonatorsInputSchema),z.string().array() ]).optional(),
  donations: z.union([ z.lazy(() => CampaignUpdatedonationsInputSchema),z.number().array() ]).optional(),
}).strict();

export const CampaignCreateManyInputSchema: z.ZodType<Prisma.CampaignCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  title: z.string(),
  story: z.string(),
  target: z.number(),
  image: z.string(),
  endDate: z.coerce.date(),
  amountCollected: z.number().optional(),
  donators: z.union([ z.lazy(() => CampaignCreatedonatorsInputSchema),z.string().array() ]).optional(),
  donations: z.union([ z.lazy(() => CampaignCreatedonationsInputSchema),z.number().array() ]).optional(),
}).strict();

export const CampaignUpdateManyMutationInputSchema: z.ZodType<Prisma.CampaignUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  story: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  target: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amountCollected: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  donators: z.union([ z.lazy(() => CampaignUpdatedonatorsInputSchema),z.string().array() ]).optional(),
  donations: z.union([ z.lazy(() => CampaignUpdatedonationsInputSchema),z.number().array() ]).optional(),
}).strict();

export const CampaignUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CampaignUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  story: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  target: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amountCollected: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  donators: z.union([ z.lazy(() => CampaignUpdatedonatorsInputSchema),z.string().array() ]).optional(),
  donations: z.union([ z.lazy(() => CampaignUpdatedonationsInputSchema),z.number().array() ]).optional(),
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

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
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
  role: z.lazy(() => SortOrderSchema).optional(),
  customerId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  customerId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  customerId: z.lazy(() => SortOrderSchema).optional(),
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

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
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

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const FloatNullableListFilterSchema: z.ZodType<Prisma.FloatNullableListFilter> = z.object({
  equals: z.number().array().optional().nullable(),
  has: z.number().optional().nullable(),
  hasEvery: z.number().array().optional(),
  hasSome: z.number().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const CampaignCountOrderByAggregateInputSchema: z.ZodType<Prisma.CampaignCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  story: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  amountCollected: z.lazy(() => SortOrderSchema).optional(),
  donators: z.lazy(() => SortOrderSchema).optional(),
  donations: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CampaignAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CampaignAvgOrderByAggregateInput> = z.object({
  target: z.lazy(() => SortOrderSchema).optional(),
  amountCollected: z.lazy(() => SortOrderSchema).optional(),
  donations: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CampaignMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CampaignMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  story: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  amountCollected: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CampaignMinOrderByAggregateInputSchema: z.ZodType<Prisma.CampaignMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  story: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  amountCollected: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CampaignSumOrderByAggregateInputSchema: z.ZodType<Prisma.CampaignSumOrderByAggregateInput> = z.object({
  target: z.lazy(() => SortOrderSchema).optional(),
  amountCollected: z.lazy(() => SortOrderSchema).optional(),
  donations: z.lazy(() => SortOrderSchema).optional()
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

export const CampaignCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CampaignCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CampaignCreateWithoutUserInputSchema),z.lazy(() => CampaignCreateWithoutUserInputSchema).array(),z.lazy(() => CampaignUncheckedCreateWithoutUserInputSchema),z.lazy(() => CampaignUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CampaignCreateOrConnectWithoutUserInputSchema),z.lazy(() => CampaignCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CampaignCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CampaignWhereUniqueInputSchema),z.lazy(() => CampaignWhereUniqueInputSchema).array() ]).optional(),
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

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RoleSchema).optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
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

export const CampaignCreatedonatorsInputSchema: z.ZodType<Prisma.CampaignCreatedonatorsInput> = z.object({
  set: z.string().array()
}).strict();

export const CampaignCreatedonationsInputSchema: z.ZodType<Prisma.CampaignCreatedonationsInput> = z.object({
  set: z.number().array()
}).strict();

export const UserCreateNestedOneWithoutCampaignsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCampaignsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCampaignsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCampaignsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCampaignsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const CampaignUpdatedonatorsInputSchema: z.ZodType<Prisma.CampaignUpdatedonatorsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const CampaignUpdatedonationsInputSchema: z.ZodType<Prisma.CampaignUpdatedonationsInput> = z.object({
  set: z.number().array().optional(),
  push: z.union([ z.number(),z.number().array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutCampaignsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCampaignsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCampaignsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCampaignsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCampaignsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCampaignsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutCampaignsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCampaignsInputSchema) ]).optional(),
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

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
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

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
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

export const CampaignCreateWithoutUserInputSchema: z.ZodType<Prisma.CampaignCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  story: z.string(),
  target: z.number(),
  image: z.string(),
  endDate: z.coerce.date(),
  amountCollected: z.number().optional(),
  donators: z.union([ z.lazy(() => CampaignCreatedonatorsInputSchema),z.string().array() ]).optional(),
  donations: z.union([ z.lazy(() => CampaignCreatedonationsInputSchema),z.number().array() ]).optional(),
}).strict();

export const CampaignUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.CampaignUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  story: z.string(),
  target: z.number(),
  image: z.string(),
  endDate: z.coerce.date(),
  amountCollected: z.number().optional(),
  donators: z.union([ z.lazy(() => CampaignCreatedonatorsInputSchema),z.string().array() ]).optional(),
  donations: z.union([ z.lazy(() => CampaignCreatedonationsInputSchema),z.number().array() ]).optional(),
}).strict();

export const CampaignCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.CampaignCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => CampaignWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CampaignCreateWithoutUserInputSchema),z.lazy(() => CampaignUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CampaignCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.CampaignCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CampaignCreateManyUserInputSchema),z.lazy(() => CampaignCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
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
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  story: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  target: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  image: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  amountCollected: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  donators: z.lazy(() => StringNullableListFilterSchema).optional(),
  donations: z.lazy(() => FloatNullableListFilterSchema).optional()
}).strict();

export const UserCreateWithoutCampaignsInputSchema: z.ZodType<Prisma.UserCreateWithoutCampaignsInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  customerId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUncheckedCreateWithoutCampaignsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCampaignsInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  customerId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserCreateOrConnectWithoutCampaignsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCampaignsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCampaignsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCampaignsInputSchema) ]),
}).strict();

export const UserUpsertWithoutCampaignsInputSchema: z.ZodType<Prisma.UserUpsertWithoutCampaignsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCampaignsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCampaignsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCampaignsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCampaignsInputSchema) ]),
}).strict();

export const UserUpdateWithoutCampaignsInputSchema: z.ZodType<Prisma.UserUpdateWithoutCampaignsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  customerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutCampaignsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCampaignsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  customerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CampaignCreateManyUserInputSchema: z.ZodType<Prisma.CampaignCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  story: z.string(),
  target: z.number(),
  image: z.string(),
  endDate: z.coerce.date(),
  amountCollected: z.number().optional(),
  donators: z.union([ z.lazy(() => CampaignCreatedonatorsInputSchema),z.string().array() ]).optional(),
  donations: z.union([ z.lazy(() => CampaignCreatedonationsInputSchema),z.number().array() ]).optional(),
}).strict();

export const CampaignUpdateWithoutUserInputSchema: z.ZodType<Prisma.CampaignUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  story: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  target: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amountCollected: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  donators: z.union([ z.lazy(() => CampaignUpdatedonatorsInputSchema),z.string().array() ]).optional(),
  donations: z.union([ z.lazy(() => CampaignUpdatedonationsInputSchema),z.number().array() ]).optional(),
}).strict();

export const CampaignUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.CampaignUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  story: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  target: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amountCollected: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  donators: z.union([ z.lazy(() => CampaignUpdatedonatorsInputSchema),z.string().array() ]).optional(),
  donations: z.union([ z.lazy(() => CampaignUpdatedonationsInputSchema),z.number().array() ]).optional(),
}).strict();

export const CampaignUncheckedUpdateManyWithoutCampaignsInputSchema: z.ZodType<Prisma.CampaignUncheckedUpdateManyWithoutCampaignsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  story: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  target: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  amountCollected: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  donators: z.union([ z.lazy(() => CampaignUpdatedonatorsInputSchema),z.string().array() ]).optional(),
  donations: z.union([ z.lazy(() => CampaignUpdatedonationsInputSchema),z.number().array() ]).optional(),
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