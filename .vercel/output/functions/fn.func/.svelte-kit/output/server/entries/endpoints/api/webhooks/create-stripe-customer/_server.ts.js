import { A as API_KEY } from "../../../../../chunks/private.js";
import { j as json } from "../../../../../chunks/index.js";
import { s as stripe } from "../../../../../chunks/stripe.js";
import { p as prisma } from "../../../../../chunks/prisma.js";
import { z } from "zod";
const CampaignScalarFieldEnumSchema = z.enum(["id", "userId", "title", "story", "target", "image", "endDate", "amountCollected", "donators", "donations"]);
const QueryModeSchema = z.enum(["default", "insensitive"]);
const SortOrderSchema = z.enum(["asc", "desc"]);
z.enum(["ReadUncommitted", "ReadCommitted", "RepeatableRead", "Serializable"]);
const UserScalarFieldEnumSchema = z.enum(["id", "email", "role", "customerId", "createdAt", "updatedAt"]);
const RoleSchema = z.enum(["ADMIN", "USER"]);
const UserSchema = z.object({
  role: RoleSchema,
  id: z.string().uuid(),
  email: z.string(),
  customerId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
});
z.object({
  id: z.string().uuid(),
  userId: z.string(),
  title: z.string(),
  story: z.string(),
  target: z.number(),
  image: z.string(),
  endDate: z.coerce.date(),
  amountCollected: z.number(),
  donators: z.string().array(),
  donations: z.number().array()
});
const UserIncludeSchema = z.object({
  campaigns: z.union([z.boolean(), z.lazy(() => CampaignFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)]).optional()
}).strict();
const UserArgsSchema = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional()
}).strict();
const UserCountOutputTypeArgsSchema = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish()
}).strict();
const UserCountOutputTypeSelectSchema = z.object({
  campaigns: z.boolean().optional()
}).strict();
const UserSelectSchema = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  role: z.boolean().optional(),
  customerId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  campaigns: z.union([z.boolean(), z.lazy(() => CampaignFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)]).optional()
}).strict();
const CampaignIncludeSchema = z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional()
}).strict();
z.object({
  select: z.lazy(() => CampaignSelectSchema).optional(),
  include: z.lazy(() => CampaignIncludeSchema).optional()
}).strict();
const CampaignSelectSchema = z.object({
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
  user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional()
}).strict();
const UserWhereInputSchema = z.object({
  AND: z.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  role: z.union([z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema)]).optional(),
  customerId: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
  campaigns: z.lazy(() => CampaignListRelationFilterSchema).optional()
}).strict();
const UserOrderByWithRelationInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  customerId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  campaigns: z.lazy(() => CampaignOrderByRelationAggregateInputSchema).optional()
}).strict();
const UserWhereUniqueInputSchema = z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional(),
  customerId: z.string().optional()
}).strict();
const UserOrderByWithAggregationInputSchema = z.object({
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
const UserScalarWhereWithAggregatesInputSchema = z.object({
  AND: z.union([z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  role: z.union([z.lazy(() => EnumRoleWithAggregatesFilterSchema), z.lazy(() => RoleSchema)]).optional(),
  customerId: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional()
}).strict();
const CampaignWhereInputSchema = z.object({
  AND: z.union([z.lazy(() => CampaignWhereInputSchema), z.lazy(() => CampaignWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => CampaignWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => CampaignWhereInputSchema), z.lazy(() => CampaignWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  story: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  target: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  image: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  endDate: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
  amountCollected: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  donators: z.lazy(() => StringNullableListFilterSchema).optional(),
  donations: z.lazy(() => FloatNullableListFilterSchema).optional(),
  user: z.union([z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional()
}).strict();
const CampaignOrderByWithRelationInputSchema = z.object({
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
const CampaignWhereUniqueInputSchema = z.object({
  id: z.string().uuid().optional()
}).strict();
const CampaignOrderByWithAggregationInputSchema = z.object({
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
const CampaignScalarWhereWithAggregatesInputSchema = z.object({
  AND: z.union([z.lazy(() => CampaignScalarWhereWithAggregatesInputSchema), z.lazy(() => CampaignScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => CampaignScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => CampaignScalarWhereWithAggregatesInputSchema), z.lazy(() => CampaignScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  title: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  story: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  target: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
  image: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  endDate: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
  amountCollected: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
  donators: z.lazy(() => StringNullableListFilterSchema).optional(),
  donations: z.lazy(() => FloatNullableListFilterSchema).optional()
}).strict();
const UserCreateInputSchema = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  customerId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  campaigns: z.lazy(() => CampaignCreateNestedManyWithoutUserInputSchema).optional()
}).strict();
const UserUncheckedCreateInputSchema = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  customerId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  campaigns: z.lazy(() => CampaignUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();
const UserUpdateInputSchema = z.object({
  id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)]).optional(),
  customerId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  campaigns: z.lazy(() => CampaignUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();
const UserUncheckedUpdateInputSchema = z.object({
  id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)]).optional(),
  customerId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  campaigns: z.lazy(() => CampaignUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();
const UserCreateManyInputSchema = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  customerId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
const UserUpdateManyMutationInputSchema = z.object({
  id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)]).optional(),
  customerId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional()
}).strict();
const UserUncheckedUpdateManyInputSchema = z.object({
  id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)]).optional(),
  customerId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional()
}).strict();
const CampaignCreateInputSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  story: z.string(),
  target: z.number(),
  image: z.string(),
  endDate: z.coerce.date(),
  amountCollected: z.number().optional(),
  donators: z.union([z.lazy(() => CampaignCreatedonatorsInputSchema), z.string().array()]).optional(),
  donations: z.union([z.lazy(() => CampaignCreatedonationsInputSchema), z.number().array()]).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCampaignsInputSchema)
}).strict();
const CampaignUncheckedCreateInputSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  title: z.string(),
  story: z.string(),
  target: z.number(),
  image: z.string(),
  endDate: z.coerce.date(),
  amountCollected: z.number().optional(),
  donators: z.union([z.lazy(() => CampaignCreatedonatorsInputSchema), z.string().array()]).optional(),
  donations: z.union([z.lazy(() => CampaignCreatedonationsInputSchema), z.number().array()]).optional()
}).strict();
const CampaignUpdateInputSchema = z.object({
  id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  story: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  target: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  image: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  endDate: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  amountCollected: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  donators: z.union([z.lazy(() => CampaignUpdatedonatorsInputSchema), z.string().array()]).optional(),
  donations: z.union([z.lazy(() => CampaignUpdatedonationsInputSchema), z.number().array()]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCampaignsNestedInputSchema).optional()
}).strict();
const CampaignUncheckedUpdateInputSchema = z.object({
  id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  story: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  target: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  image: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  endDate: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  amountCollected: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  donators: z.union([z.lazy(() => CampaignUpdatedonatorsInputSchema), z.string().array()]).optional(),
  donations: z.union([z.lazy(() => CampaignUpdatedonationsInputSchema), z.number().array()]).optional()
}).strict();
const CampaignCreateManyInputSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  title: z.string(),
  story: z.string(),
  target: z.number(),
  image: z.string(),
  endDate: z.coerce.date(),
  amountCollected: z.number().optional(),
  donators: z.union([z.lazy(() => CampaignCreatedonatorsInputSchema), z.string().array()]).optional(),
  donations: z.union([z.lazy(() => CampaignCreatedonationsInputSchema), z.number().array()]).optional()
}).strict();
const CampaignUpdateManyMutationInputSchema = z.object({
  id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  story: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  target: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  image: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  endDate: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  amountCollected: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  donators: z.union([z.lazy(() => CampaignUpdatedonatorsInputSchema), z.string().array()]).optional(),
  donations: z.union([z.lazy(() => CampaignUpdatedonationsInputSchema), z.number().array()]).optional()
}).strict();
const CampaignUncheckedUpdateManyInputSchema = z.object({
  id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  story: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  target: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  image: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  endDate: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  amountCollected: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  donators: z.union([z.lazy(() => CampaignUpdatedonatorsInputSchema), z.string().array()]).optional(),
  donations: z.union([z.lazy(() => CampaignUpdatedonationsInputSchema), z.number().array()]).optional()
}).strict();
const StringFilterSchema = z.object({
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
  not: z.union([z.string(), z.lazy(() => NestedStringFilterSchema)]).optional()
}).strict();
const EnumRoleFilterSchema = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleFilterSchema)]).optional()
}).strict();
const StringNullableFilterSchema = z.object({
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
  not: z.union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)]).optional().nullable()
}).strict();
const DateTimeFilterSchema = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)]).optional()
}).strict();
const CampaignListRelationFilterSchema = z.object({
  every: z.lazy(() => CampaignWhereInputSchema).optional(),
  some: z.lazy(() => CampaignWhereInputSchema).optional(),
  none: z.lazy(() => CampaignWhereInputSchema).optional()
}).strict();
const CampaignOrderByRelationAggregateInputSchema = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();
const UserCountOrderByAggregateInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  customerId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();
const UserMaxOrderByAggregateInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  customerId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();
const UserMinOrderByAggregateInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  customerId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();
const StringWithAggregatesFilterSchema = z.object({
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
  not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();
const EnumRoleWithAggregatesFilterSchema = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();
const StringNullableWithAggregatesFilterSchema = z.object({
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
  not: z.union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();
const DateTimeWithAggregatesFilterSchema = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();
const FloatFilterSchema = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatFilterSchema)]).optional()
}).strict();
const StringNullableListFilterSchema = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();
const FloatNullableListFilterSchema = z.object({
  equals: z.number().array().optional().nullable(),
  has: z.number().optional().nullable(),
  hasEvery: z.number().array().optional(),
  hasSome: z.number().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();
const UserRelationFilterSchema = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();
const CampaignCountOrderByAggregateInputSchema = z.object({
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
const CampaignAvgOrderByAggregateInputSchema = z.object({
  target: z.lazy(() => SortOrderSchema).optional(),
  amountCollected: z.lazy(() => SortOrderSchema).optional(),
  donations: z.lazy(() => SortOrderSchema).optional()
}).strict();
const CampaignMaxOrderByAggregateInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  story: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  amountCollected: z.lazy(() => SortOrderSchema).optional()
}).strict();
const CampaignMinOrderByAggregateInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  story: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  amountCollected: z.lazy(() => SortOrderSchema).optional()
}).strict();
const CampaignSumOrderByAggregateInputSchema = z.object({
  target: z.lazy(() => SortOrderSchema).optional(),
  amountCollected: z.lazy(() => SortOrderSchema).optional(),
  donations: z.lazy(() => SortOrderSchema).optional()
}).strict();
const FloatWithAggregatesFilterSchema = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();
const CampaignCreateNestedManyWithoutUserInputSchema = z.object({
  create: z.union([z.lazy(() => CampaignCreateWithoutUserInputSchema), z.lazy(() => CampaignCreateWithoutUserInputSchema).array(), z.lazy(() => CampaignUncheckedCreateWithoutUserInputSchema), z.lazy(() => CampaignUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CampaignCreateOrConnectWithoutUserInputSchema), z.lazy(() => CampaignCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => CampaignCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => CampaignWhereUniqueInputSchema), z.lazy(() => CampaignWhereUniqueInputSchema).array()]).optional()
}).strict();
const CampaignUncheckedCreateNestedManyWithoutUserInputSchema = z.object({
  create: z.union([z.lazy(() => CampaignCreateWithoutUserInputSchema), z.lazy(() => CampaignCreateWithoutUserInputSchema).array(), z.lazy(() => CampaignUncheckedCreateWithoutUserInputSchema), z.lazy(() => CampaignUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CampaignCreateOrConnectWithoutUserInputSchema), z.lazy(() => CampaignCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => CampaignCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => CampaignWhereUniqueInputSchema), z.lazy(() => CampaignWhereUniqueInputSchema).array()]).optional()
}).strict();
const StringFieldUpdateOperationsInputSchema = z.object({
  set: z.string().optional()
}).strict();
const EnumRoleFieldUpdateOperationsInputSchema = z.object({
  set: z.lazy(() => RoleSchema).optional()
}).strict();
const NullableStringFieldUpdateOperationsInputSchema = z.object({
  set: z.string().optional().nullable()
}).strict();
const DateTimeFieldUpdateOperationsInputSchema = z.object({
  set: z.coerce.date().optional()
}).strict();
const CampaignUpdateManyWithoutUserNestedInputSchema = z.object({
  create: z.union([z.lazy(() => CampaignCreateWithoutUserInputSchema), z.lazy(() => CampaignCreateWithoutUserInputSchema).array(), z.lazy(() => CampaignUncheckedCreateWithoutUserInputSchema), z.lazy(() => CampaignUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CampaignCreateOrConnectWithoutUserInputSchema), z.lazy(() => CampaignCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CampaignUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => CampaignUpsertWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => CampaignCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => CampaignWhereUniqueInputSchema), z.lazy(() => CampaignWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CampaignWhereUniqueInputSchema), z.lazy(() => CampaignWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CampaignWhereUniqueInputSchema), z.lazy(() => CampaignWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CampaignWhereUniqueInputSchema), z.lazy(() => CampaignWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => CampaignUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => CampaignUpdateWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CampaignUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => CampaignUpdateManyWithWhereWithoutUserInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CampaignScalarWhereInputSchema), z.lazy(() => CampaignScalarWhereInputSchema).array()]).optional()
}).strict();
const CampaignUncheckedUpdateManyWithoutUserNestedInputSchema = z.object({
  create: z.union([z.lazy(() => CampaignCreateWithoutUserInputSchema), z.lazy(() => CampaignCreateWithoutUserInputSchema).array(), z.lazy(() => CampaignUncheckedCreateWithoutUserInputSchema), z.lazy(() => CampaignUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CampaignCreateOrConnectWithoutUserInputSchema), z.lazy(() => CampaignCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CampaignUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => CampaignUpsertWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => CampaignCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => CampaignWhereUniqueInputSchema), z.lazy(() => CampaignWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CampaignWhereUniqueInputSchema), z.lazy(() => CampaignWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CampaignWhereUniqueInputSchema), z.lazy(() => CampaignWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CampaignWhereUniqueInputSchema), z.lazy(() => CampaignWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => CampaignUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => CampaignUpdateWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CampaignUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => CampaignUpdateManyWithWhereWithoutUserInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CampaignScalarWhereInputSchema), z.lazy(() => CampaignScalarWhereInputSchema).array()]).optional()
}).strict();
const CampaignCreatedonatorsInputSchema = z.object({
  set: z.string().array()
}).strict();
const CampaignCreatedonationsInputSchema = z.object({
  set: z.number().array()
}).strict();
const UserCreateNestedOneWithoutCampaignsInputSchema = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutCampaignsInputSchema), z.lazy(() => UserUncheckedCreateWithoutCampaignsInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCampaignsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();
const FloatFieldUpdateOperationsInputSchema = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();
const CampaignUpdatedonatorsInputSchema = z.object({
  set: z.string().array().optional(),
  push: z.union([z.string(), z.string().array()]).optional()
}).strict();
const CampaignUpdatedonationsInputSchema = z.object({
  set: z.number().array().optional(),
  push: z.union([z.number(), z.number().array()]).optional()
}).strict();
const UserUpdateOneRequiredWithoutCampaignsNestedInputSchema = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutCampaignsInputSchema), z.lazy(() => UserUncheckedCreateWithoutCampaignsInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCampaignsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCampaignsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateWithoutCampaignsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutCampaignsInputSchema)]).optional()
}).strict();
const NestedStringFilterSchema = z.object({
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
  not: z.union([z.string(), z.lazy(() => NestedStringFilterSchema)]).optional()
}).strict();
const NestedEnumRoleFilterSchema = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleFilterSchema)]).optional()
}).strict();
const NestedStringNullableFilterSchema = z.object({
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
  not: z.union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)]).optional().nullable()
}).strict();
const NestedDateTimeFilterSchema = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)]).optional()
}).strict();
const NestedStringWithAggregatesFilterSchema = z.object({
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
  not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();
const NestedIntFilterSchema = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional()
}).strict();
const NestedEnumRoleWithAggregatesFilterSchema = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();
const NestedStringNullableWithAggregatesFilterSchema = z.object({
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
  not: z.union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();
const NestedIntNullableFilterSchema = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)]).optional().nullable()
}).strict();
const NestedDateTimeWithAggregatesFilterSchema = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();
const NestedFloatFilterSchema = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatFilterSchema)]).optional()
}).strict();
const NestedFloatWithAggregatesFilterSchema = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();
const CampaignCreateWithoutUserInputSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  story: z.string(),
  target: z.number(),
  image: z.string(),
  endDate: z.coerce.date(),
  amountCollected: z.number().optional(),
  donators: z.union([z.lazy(() => CampaignCreatedonatorsInputSchema), z.string().array()]).optional(),
  donations: z.union([z.lazy(() => CampaignCreatedonationsInputSchema), z.number().array()]).optional()
}).strict();
const CampaignUncheckedCreateWithoutUserInputSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  story: z.string(),
  target: z.number(),
  image: z.string(),
  endDate: z.coerce.date(),
  amountCollected: z.number().optional(),
  donators: z.union([z.lazy(() => CampaignCreatedonatorsInputSchema), z.string().array()]).optional(),
  donations: z.union([z.lazy(() => CampaignCreatedonationsInputSchema), z.number().array()]).optional()
}).strict();
const CampaignCreateOrConnectWithoutUserInputSchema = z.object({
  where: z.lazy(() => CampaignWhereUniqueInputSchema),
  create: z.union([z.lazy(() => CampaignCreateWithoutUserInputSchema), z.lazy(() => CampaignUncheckedCreateWithoutUserInputSchema)])
}).strict();
const CampaignCreateManyUserInputEnvelopeSchema = z.object({
  data: z.union([z.lazy(() => CampaignCreateManyUserInputSchema), z.lazy(() => CampaignCreateManyUserInputSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
const CampaignUpsertWithWhereUniqueWithoutUserInputSchema = z.object({
  where: z.lazy(() => CampaignWhereUniqueInputSchema),
  update: z.union([z.lazy(() => CampaignUpdateWithoutUserInputSchema), z.lazy(() => CampaignUncheckedUpdateWithoutUserInputSchema)]),
  create: z.union([z.lazy(() => CampaignCreateWithoutUserInputSchema), z.lazy(() => CampaignUncheckedCreateWithoutUserInputSchema)])
}).strict();
const CampaignUpdateWithWhereUniqueWithoutUserInputSchema = z.object({
  where: z.lazy(() => CampaignWhereUniqueInputSchema),
  data: z.union([z.lazy(() => CampaignUpdateWithoutUserInputSchema), z.lazy(() => CampaignUncheckedUpdateWithoutUserInputSchema)])
}).strict();
const CampaignUpdateManyWithWhereWithoutUserInputSchema = z.object({
  where: z.lazy(() => CampaignScalarWhereInputSchema),
  data: z.union([z.lazy(() => CampaignUpdateManyMutationInputSchema), z.lazy(() => CampaignUncheckedUpdateManyWithoutCampaignsInputSchema)])
}).strict();
const CampaignScalarWhereInputSchema = z.object({
  AND: z.union([z.lazy(() => CampaignScalarWhereInputSchema), z.lazy(() => CampaignScalarWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => CampaignScalarWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => CampaignScalarWhereInputSchema), z.lazy(() => CampaignScalarWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  story: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  target: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  image: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  endDate: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
  amountCollected: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
  donators: z.lazy(() => StringNullableListFilterSchema).optional(),
  donations: z.lazy(() => FloatNullableListFilterSchema).optional()
}).strict();
const UserCreateWithoutCampaignsInputSchema = z.object({
  id: z.string().optional(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  customerId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
const UserUncheckedCreateWithoutCampaignsInputSchema = z.object({
  id: z.string().optional(),
  email: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  customerId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
const UserCreateOrConnectWithoutCampaignsInputSchema = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([z.lazy(() => UserCreateWithoutCampaignsInputSchema), z.lazy(() => UserUncheckedCreateWithoutCampaignsInputSchema)])
}).strict();
const UserUpsertWithoutCampaignsInputSchema = z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutCampaignsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutCampaignsInputSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutCampaignsInputSchema), z.lazy(() => UserUncheckedCreateWithoutCampaignsInputSchema)])
}).strict();
const UserUpdateWithoutCampaignsInputSchema = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)]).optional(),
  customerId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional()
}).strict();
const UserUncheckedUpdateWithoutCampaignsInputSchema = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)]).optional(),
  customerId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional()
}).strict();
const CampaignCreateManyUserInputSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  story: z.string(),
  target: z.number(),
  image: z.string(),
  endDate: z.coerce.date(),
  amountCollected: z.number().optional(),
  donators: z.union([z.lazy(() => CampaignCreatedonatorsInputSchema), z.string().array()]).optional(),
  donations: z.union([z.lazy(() => CampaignCreatedonationsInputSchema), z.number().array()]).optional()
}).strict();
const CampaignUpdateWithoutUserInputSchema = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  story: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  target: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  image: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  endDate: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  amountCollected: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  donators: z.union([z.lazy(() => CampaignUpdatedonatorsInputSchema), z.string().array()]).optional(),
  donations: z.union([z.lazy(() => CampaignUpdatedonationsInputSchema), z.number().array()]).optional()
}).strict();
const CampaignUncheckedUpdateWithoutUserInputSchema = z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  story: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  target: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  image: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  endDate: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  amountCollected: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  donators: z.union([z.lazy(() => CampaignUpdatedonatorsInputSchema), z.string().array()]).optional(),
  donations: z.union([z.lazy(() => CampaignUpdatedonationsInputSchema), z.number().array()]).optional()
}).strict();
const CampaignUncheckedUpdateManyWithoutCampaignsInputSchema = z.object({
  id: z.union([z.string().uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  story: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  target: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  image: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  endDate: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  amountCollected: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  donators: z.union([z.lazy(() => CampaignUpdatedonatorsInputSchema), z.string().array()]).optional(),
  donations: z.union([z.lazy(() => CampaignUpdatedonationsInputSchema), z.number().array()]).optional()
}).strict();
z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional()
}).strict();
z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional()
}).strict();
z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional()
}).strict();
z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional()
}).strict();
z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([UserOrderByWithAggregationInputSchema.array(), UserOrderByWithAggregationInputSchema]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional()
}).strict();
z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema
}).strict();
z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema
}).strict();
z.object({
  select: CampaignSelectSchema.optional(),
  include: CampaignIncludeSchema.optional(),
  where: CampaignWhereInputSchema.optional(),
  orderBy: z.union([CampaignOrderByWithRelationInputSchema.array(), CampaignOrderByWithRelationInputSchema]).optional(),
  cursor: CampaignWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CampaignScalarFieldEnumSchema.array().optional()
}).strict();
z.object({
  select: CampaignSelectSchema.optional(),
  include: CampaignIncludeSchema.optional(),
  where: CampaignWhereInputSchema.optional(),
  orderBy: z.union([CampaignOrderByWithRelationInputSchema.array(), CampaignOrderByWithRelationInputSchema]).optional(),
  cursor: CampaignWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CampaignScalarFieldEnumSchema.array().optional()
}).strict();
const CampaignFindManyArgsSchema = z.object({
  select: CampaignSelectSchema.optional(),
  include: CampaignIncludeSchema.optional(),
  where: CampaignWhereInputSchema.optional(),
  orderBy: z.union([CampaignOrderByWithRelationInputSchema.array(), CampaignOrderByWithRelationInputSchema]).optional(),
  cursor: CampaignWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CampaignScalarFieldEnumSchema.array().optional()
}).strict();
z.object({
  where: CampaignWhereInputSchema.optional(),
  orderBy: z.union([CampaignOrderByWithRelationInputSchema.array(), CampaignOrderByWithRelationInputSchema]).optional(),
  cursor: CampaignWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional()
}).strict();
z.object({
  where: CampaignWhereInputSchema.optional(),
  orderBy: z.union([CampaignOrderByWithAggregationInputSchema.array(), CampaignOrderByWithAggregationInputSchema]).optional(),
  by: CampaignScalarFieldEnumSchema.array(),
  having: CampaignScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional()
}).strict();
z.object({
  select: CampaignSelectSchema.optional(),
  include: CampaignIncludeSchema.optional(),
  where: CampaignWhereUniqueInputSchema
}).strict();
z.object({
  select: CampaignSelectSchema.optional(),
  include: CampaignIncludeSchema.optional(),
  where: CampaignWhereUniqueInputSchema
}).strict();
z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema])
}).strict();
z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
  update: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema])
}).strict();
z.object({
  data: z.union([UserCreateManyInputSchema, UserCreateManyInputSchema.array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema
}).strict();
z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
  where: UserWhereUniqueInputSchema
}).strict();
z.object({
  data: z.union([UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema]),
  where: UserWhereInputSchema.optional()
}).strict();
z.object({
  where: UserWhereInputSchema.optional()
}).strict();
z.object({
  select: CampaignSelectSchema.optional(),
  include: CampaignIncludeSchema.optional(),
  data: z.union([CampaignCreateInputSchema, CampaignUncheckedCreateInputSchema])
}).strict();
z.object({
  select: CampaignSelectSchema.optional(),
  include: CampaignIncludeSchema.optional(),
  where: CampaignWhereUniqueInputSchema,
  create: z.union([CampaignCreateInputSchema, CampaignUncheckedCreateInputSchema]),
  update: z.union([CampaignUpdateInputSchema, CampaignUncheckedUpdateInputSchema])
}).strict();
z.object({
  data: z.union([CampaignCreateManyInputSchema, CampaignCreateManyInputSchema.array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
z.object({
  select: CampaignSelectSchema.optional(),
  include: CampaignIncludeSchema.optional(),
  where: CampaignWhereUniqueInputSchema
}).strict();
z.object({
  select: CampaignSelectSchema.optional(),
  include: CampaignIncludeSchema.optional(),
  data: z.union([CampaignUpdateInputSchema, CampaignUncheckedUpdateInputSchema]),
  where: CampaignWhereUniqueInputSchema
}).strict();
z.object({
  data: z.union([CampaignUpdateManyMutationInputSchema, CampaignUncheckedUpdateManyInputSchema]),
  where: CampaignWhereInputSchema.optional()
}).strict();
z.object({
  where: CampaignWhereInputSchema.optional()
}).strict();
const POST = async ({ url, request }) => {
  if (url.searchParams.get("API_KEY") != API_KEY) {
    return json({ error: "Invalid api key" }, { status: 401 });
  }
  const body = await request.json();
  const parsedBody = UserSchema.safeParse(body.record);
  if (!parsedBody.success) {
    return json({ error: "Invalid body" }, { status: 400 });
  }
  const user = parsedBody.data;
  const stripeCustomer = await stripe.customers.create({
    email: user.email
  });
  try {
    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        customerId: stripeCustomer.id
      }
    });
  } catch (err) {
    return json({ error: "Failed to update user" }, { status: 500 });
  }
  return json({ success: true }, { status: 200 });
};
export {
  POST
};
