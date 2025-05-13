CREATE TABLE "activityLog" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"action" text NOT NULL,
	"bookId" uuid NOT NULL,
	"libraryId" uuid NOT NULL,
	"details" jsonb,
	"createdAt" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "bookNotes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bookId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"note" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "bookTags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bookId" uuid NOT NULL,
	"tagId" uuid NOT NULL,
	CONSTRAINT "bookTags_bookId_tagId_unique" UNIQUE("bookId","tagId")
);
--> statement-breakpoint
CREATE TABLE "books" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"authors" text[],
	"publisher" text,
	"publishedDate" text,
	"isbn10" text,
	"isbn13" text,
	"pageCount" integer,
	"coverUrl" text,
	"description" text,
	"createdAt" timestamp with time zone DEFAULT now(),
	"userId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "libraries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"createdAt" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "libraryBooks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"libraryId" uuid NOT NULL,
	"bookId" uuid NOT NULL,
	"addedAt" timestamp with time zone DEFAULT now(),
	"readingStatus" text DEFAULT 'not_started',
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "sharedBooks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bookId" uuid NOT NULL,
	"sharedWith" uuid NOT NULL,
	"sharedAt" timestamp with time zone DEFAULT now(),
	CONSTRAINT "sharedBooks_bookId_sharedWith_unique" UNIQUE("bookId","sharedWith")
);
--> statement-breakpoint
CREATE TABLE "sharedLibraries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"libraryId" uuid NOT NULL,
	"sharedWith" uuid NOT NULL,
	"canEdit" boolean DEFAULT false,
	"sharedAt" timestamp with time zone DEFAULT now(),
	CONSTRAINT "sharedLibraries_libraryId_sharedWith_unique" UNIQUE("libraryId","sharedWith")
);
--> statement-breakpoint
CREATE TABLE "tabs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" uuid NOT NULL,
	"createAt" timestamp with time zone DEFAULT now(),
	CONSTRAINT "tabs_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(20),
	"firstName" text,
	"lastName" text,
	"avararUrl" text,
	"email" varchar(320) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	"updatedAt" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "activityLog" ADD CONSTRAINT "activityLog_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activityLog" ADD CONSTRAINT "activityLog_bookId_books_id_fk" FOREIGN KEY ("bookId") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activityLog" ADD CONSTRAINT "activityLog_libraryId_libraries_id_fk" FOREIGN KEY ("libraryId") REFERENCES "public"."libraries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookNotes" ADD CONSTRAINT "bookNotes_bookId_books_id_fk" FOREIGN KEY ("bookId") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookNotes" ADD CONSTRAINT "bookNotes_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookTags" ADD CONSTRAINT "bookTags_bookId_books_id_fk" FOREIGN KEY ("bookId") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookTags" ADD CONSTRAINT "bookTags_tagId_tabs_id_fk" FOREIGN KEY ("tagId") REFERENCES "public"."tabs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "books" ADD CONSTRAINT "books_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "libraries" ADD CONSTRAINT "libraries_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "libraryBooks" ADD CONSTRAINT "libraryBooks_libraryId_libraries_id_fk" FOREIGN KEY ("libraryId") REFERENCES "public"."libraries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "libraryBooks" ADD CONSTRAINT "libraryBooks_bookId_books_id_fk" FOREIGN KEY ("bookId") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sharedBooks" ADD CONSTRAINT "sharedBooks_bookId_books_id_fk" FOREIGN KEY ("bookId") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sharedBooks" ADD CONSTRAINT "sharedBooks_sharedWith_users_id_fk" FOREIGN KEY ("sharedWith") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sharedLibraries" ADD CONSTRAINT "sharedLibraries_libraryId_libraries_id_fk" FOREIGN KEY ("libraryId") REFERENCES "public"."libraries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sharedLibraries" ADD CONSTRAINT "sharedLibraries_sharedWith_users_id_fk" FOREIGN KEY ("sharedWith") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;