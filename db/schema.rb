# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140724181428) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "audiences", force: true do |t|
    t.string   "description"
    t.integer  "brief_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "briefs", force: true do |t|
    t.string   "name"
    t.date     "issue_date"
    t.date     "due_date"
    t.string   "contact_name"
    t.string   "contact"
    t.text     "instructions"
    t.string   "website"
    t.integer  "budget"
    t.string   "type_of_work"
    t.text     "client_information"
    t.string   "purpose"
    t.string   "internal_res"
    t.string   "competitors"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "comments", force: true do |t|
    t.integer  "sectionId"
    t.integer  "brief_id"
    t.string   "authorAvatarUrl"
    t.string   "authorName"
    t.text     "comment"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "elements", force: true do |t|
    t.string   "content"
    t.integer  "brief_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "features", force: true do |t|
    t.integer  "element_id"
    t.string   "content"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "questions", force: true do |t|
    t.integer  "brief_id"
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sites", force: true do |t|
    t.string   "name"
    t.integer  "brief_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
