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

ActiveRecord::Schema.define(version: 20150515162839) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "artworks", force: :cascade do |t|
    t.string   "title"
    t.string   "artist"
    t.string   "date"
    t.string   "imageURL"
    t.integer  "width"
    t.integer  "height"
    t.integer  "xpos"
    t.integer  "ypos"
    t.integer  "space_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "zIndex"
    t.string   "source"
    t.string   "apiID"
  end

  add_index "artworks", ["apiID"], name: "index_artworks_on_apiID", using: :btree
  add_index "artworks", ["space_id"], name: "index_artworks_on_space_id", using: :btree

  create_table "entries", force: :cascade do |t|
    t.text     "body"
    t.integer  "journal_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "entries", ["journal_id"], name: "index_entries_on_journal_id", using: :btree

  create_table "journals", force: :cascade do |t|
    t.string   "coverURL"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "journals", ["user_id"], name: "index_journals_on_user_id", using: :btree

  create_table "spaces", force: :cascade do |t|
    t.string   "name"
    t.datetime "lastVisited"
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "imageURL"
  end

  add_index "spaces", ["user_id"], name: "index_spaces_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "firstname"
    t.string   "lastname"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "artworks", "spaces"
  add_foreign_key "entries", "journals"
  add_foreign_key "journals", "users"
  add_foreign_key "spaces", "users"
end
