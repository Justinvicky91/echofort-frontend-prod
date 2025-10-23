CREATE TABLE `support_metrics` (
	`id` varchar(64) NOT NULL,
	`date` varchar(10) NOT NULL,
	`period` varchar(20) DEFAULT 'daily',
	`totalTickets` int DEFAULT 0,
	`openTickets` int DEFAULT 0,
	`resolvedTickets` int DEFAULT 0,
	`closedTickets` int DEFAULT 0,
	`avgFirstResponseTime` int DEFAULT 0,
	`avgResolutionTime` int DEFAULT 0,
	`escalatedToAdmin` int DEFAULT 0,
	`escalatedToSuperAdmin` int DEFAULT 0,
	`autoResponsesUsed` int DEFAULT 0,
	`autoResponseSuccessRate` int DEFAULT 0,
	`employeeId` varchar(64),
	`ticketsHandled` int DEFAULT 0,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `support_metrics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `support_tickets` (
	`id` varchar(64) NOT NULL,
	`ticketNumber` varchar(20) NOT NULL,
	`customerEmail` varchar(320) NOT NULL,
	`customerName` varchar(100),
	`customerPhone` varchar(15),
	`subject` text NOT NULL,
	`message` text NOT NULL,
	`status` varchar(20) DEFAULT 'open',
	`priority` varchar(20) DEFAULT 'normal',
	`assignedTo` varchar(64),
	`resolvedAt` timestamp,
	`firstResponseAt` timestamp,
	`category` varchar(50),
	`source` varchar(20) DEFAULT 'email',
	`escalatedToAdmin` boolean DEFAULT false,
	`escalatedToSuperAdmin` boolean DEFAULT false,
	`escalationReason` text,
	`userId` varchar(64),
	`subscriptionId` varchar(64),
	`attachments` text,
	`tags` text,
	`autoResponseUsed` boolean DEFAULT false,
	`autoResponseTemplateId` varchar(64),
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `support_tickets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ticket_assignments` (
	`id` varchar(64) NOT NULL,
	`ticketId` varchar(64) NOT NULL,
	`assignedTo` varchar(64) NOT NULL,
	`assignedBy` varchar(64),
	`reason` text,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `ticket_assignments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ticket_auto_responses` (
	`id` varchar(64) NOT NULL,
	`keyword` varchar(100) NOT NULL,
	`responseTemplate` text NOT NULL,
	`category` varchar(50),
	`enabled` boolean DEFAULT true,
	`usageCount` int DEFAULT 0,
	`successRate` int DEFAULT 0,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `ticket_auto_responses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ticket_responses` (
	`id` varchar(64) NOT NULL,
	`ticketId` varchar(64) NOT NULL,
	`senderType` varchar(20) NOT NULL,
	`senderId` varchar(64),
	`senderEmail` varchar(320),
	`senderPhone` varchar(15),
	`message` text NOT NULL,
	`isInternalNote` boolean DEFAULT false,
	`sentVia` varchar(20) DEFAULT 'email',
	`attachments` text,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `ticket_responses_id` PRIMARY KEY(`id`)
);
