class AddApiIdIndexToArtworks < ActiveRecord::Migration
  def change
    add_column :artworks, :apiID, :string
    add_index :artworks, :apiID
  end
end
