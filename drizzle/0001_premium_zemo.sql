CREATE TABLE `audit_logs` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`action` varchar(100) NOT NULL,
	`entityType` varchar(50),
	`entityId` varchar(64),
	`details` text,
	`ipAddress` varchar(45),
	`userAgent` text,
	`timestamp` timestamp DEFAULT (now()),
	CONSTRAINT `audit_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `call_logs` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`phoneNumber` varchar(15) NOT NULL,
	`callerName` varchar(100),
	`trustFactor` int,
	`isScam` boolean DEFAULT false,
	`scamType` varchar(50),
	`callDuration` int,
	`callStatus` varchar(20),
	`timestamp` timestamp DEFAULT (now()),
	`recordingUrl` text,
	`aiAnalysis` text,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `call_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `families` (
	`id` varchar(64) NOT NULL,
	`ownerId` varchar(64) NOT NULL,
	`familyName` varchar(100),
	`memberCount` int DEFAULT 1,
	`maxMembers` int DEFAULT 3,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `families_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `family_members` (
	`id` varchar(64) NOT NULL,
	`familyId` varchar(64) NOT NULL,
	`userId` varchar(64),
	`name` varchar(100) NOT NULL,
	`phone` varchar(15),
	`relationship` varchar(50),
	`isMinor` boolean DEFAULT false,
	`gpsEnabled` boolean DEFAULT false,
	`screenTimeEnabled` boolean DEFAULT false,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `family_members_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `geofences` (
	`id` varchar(64) NOT NULL,
	`familyId` varchar(64) NOT NULL,
	`name` varchar(100) NOT NULL,
	`latitude` varchar(20) NOT NULL,
	`longitude` varchar(20) NOT NULL,
	`radius` int NOT NULL,
	`alertOnEntry` boolean DEFAULT true,
	`alertOnExit` boolean DEFAULT true,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `geofences_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gps_locations` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`familyMemberId` varchar(64),
	`latitude` varchar(20) NOT NULL,
	`longitude` varchar(20) NOT NULL,
	`accuracy` int,
	`address` text,
	`timestamp` timestamp DEFAULT (now()),
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `gps_locations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `image_scans` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`imageUrl` text NOT NULL,
	`scanResult` varchar(20),
	`threatType` varchar(50),
	`confidence` int,
	`aiAnalysis` text,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `image_scans_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `infra_costs` (
	`id` varchar(64) NOT NULL,
	`month` varchar(7) NOT NULL,
	`railwayHosting` int DEFAULT 0,
	`openaiApi` int DEFAULT 0,
	`sendgridEmail` int DEFAULT 0,
	`storageS3` int DEFAULT 0,
	`paymentGatewayFees` int DEFAULT 0,
	`other` int DEFAULT 0,
	`totalCost` int NOT NULL,
	`notes` text,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `infra_costs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `legal_complaints` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`complaintType` varchar(50) NOT NULL,
	`scammerPhone` varchar(15),
	`description` text NOT NULL,
	`evidenceUrls` text,
	`status` varchar(20) DEFAULT 'draft',
	`referenceNumber` varchar(100),
	`filedAt` timestamp,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `legal_complaints_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`title` varchar(200) NOT NULL,
	`message` text NOT NULL,
	`type` varchar(20) DEFAULT 'info',
	`isRead` boolean DEFAULT false,
	`actionUrl` text,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `otps` (
	`id` varchar(64) NOT NULL,
	`email` varchar(320),
	`phone` varchar(15),
	`otp` varchar(6) NOT NULL,
	`purpose` varchar(50) NOT NULL,
	`expiresAt` timestamp NOT NULL,
	`verified` boolean DEFAULT false,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `otps_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `payments` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`subscriptionId` varchar(64),
	`amount` int NOT NULL,
	`currency` varchar(3) DEFAULT 'INR',
	`status` varchar(20) NOT NULL,
	`paymentGateway` varchar(20) NOT NULL,
	`gatewayPaymentId` varchar(100),
	`gatewayOrderId` varchar(100),
	`paymentMethod` varchar(50),
	`invoiceUrl` text,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `payments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `payroll` (
	`id` varchar(64) NOT NULL,
	`employeeId` varchar(64) NOT NULL,
	`month` varchar(7) NOT NULL,
	`baseSalary` int NOT NULL,
	`bonus` int DEFAULT 0,
	`deductions` int DEFAULT 0,
	`netSalary` int NOT NULL,
	`status` varchar(20) DEFAULT 'pending',
	`paidAt` timestamp,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `payroll_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `scam_database` (
	`id` varchar(64) NOT NULL,
	`phoneNumber` varchar(15) NOT NULL,
	`scamType` varchar(50) NOT NULL,
	`description` text,
	`reportCount` int DEFAULT 1,
	`verifiedBy` varchar(20),
	`severity` int DEFAULT 5,
	`lastReportedAt` timestamp DEFAULT (now()),
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `scam_database_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `screen_time_logs` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`familyMemberId` varchar(64),
	`appName` varchar(100) NOT NULL,
	`packageName` varchar(200),
	`usageDuration` int NOT NULL,
	`openCount` int DEFAULT 1,
	`date` varchar(10) NOT NULL,
	`addictionRisk` int,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `screen_time_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`subscription_plan` enum('basic','premium','family') NOT NULL,
	`subscription_status` enum('active','inactive','trial','expired','canceled') NOT NULL DEFAULT 'inactive',
	`amount` int NOT NULL,
	`currency` varchar(3) DEFAULT 'INR',
	`billingCycle` varchar(20) DEFAULT 'monthly',
	`startDate` timestamp NOT NULL,
	`endDate` timestamp NOT NULL,
	`autoRenew` boolean DEFAULT true,
	`paymentGateway` varchar(20),
	`gatewaySubscriptionId` varchar(100),
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `system_settings` (
	`id` varchar(64) NOT NULL,
	`settingKey` varchar(100) NOT NULL,
	`settingValue` text,
	`category` varchar(50),
	`description` text,
	`updatedBy` varchar(64),
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `system_settings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `email` varchar(320) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','employee','admin','super_admin') NOT NULL DEFAULT 'user';--> statement-breakpoint
ALTER TABLE `users` ADD `phone` varchar(15);--> statement-breakpoint
ALTER TABLE `users` ADD `department` enum('marketing','support','accounting','operations');--> statement-breakpoint
ALTER TABLE `users` ADD `employeeId` varchar(50);--> statement-breakpoint
ALTER TABLE `users` ADD `managerId` varchar(64);--> statement-breakpoint
ALTER TABLE `users` ADD `subscription_plan` enum('basic','premium','family');--> statement-breakpoint
ALTER TABLE `users` ADD `subscription_status` enum('active','inactive','trial','expired','canceled') DEFAULT 'inactive';--> statement-breakpoint
ALTER TABLE `users` ADD `subscriptionStartDate` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `subscriptionEndDate` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `trialEndedAt` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `razorpayCustomerId` varchar(100);--> statement-breakpoint
ALTER TABLE `users` ADD `razorpaySubscriptionId` varchar(100);--> statement-breakpoint
ALTER TABLE `users` ADD `stripeCustomerId` varchar(100);--> statement-breakpoint
ALTER TABLE `users` ADD `stripeSubscriptionId` varchar(100);--> statement-breakpoint
ALTER TABLE `users` ADD `deviceId` varchar(100);--> statement-breakpoint
ALTER TABLE `users` ADD `deviceName` varchar(100);--> statement-breakpoint
ALTER TABLE `users` ADD `emailVerified` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `users` ADD `phoneVerified` boolean DEFAULT false;