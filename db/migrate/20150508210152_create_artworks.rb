class CreateArtworks < ActiveRecord::Migration
  def change
    create_table :artworks do |t|
      t.string :type
      t.string :title
      t.string :artist
      t.string :date
      t.string :imageURL
      t.integer :width
      t.integer :height
      t.integer :xpos
      t.integer :ypos
      t.references :space, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
