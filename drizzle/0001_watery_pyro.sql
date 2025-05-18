ALTER TABLE "books" ALTER COLUMN "subtitle" SET DEFAULT 'Unknown';--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "authors" SET DEFAULT ARRAY[]::text[];--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "publisher" SET DEFAULT 'Unknown';--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "published_date" SET DEFAULT 'Unknown';--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "isbn_10" SET DEFAULT 'N/A';--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "isbn_13" SET DEFAULT 'N/A';--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "page_count" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "cover_url" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "categories" SET DEFAULT ARRAY[]::text[];--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "language" SET DEFAULT 'Unknown';--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "info_link" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "description" SET DEFAULT 'No description available';