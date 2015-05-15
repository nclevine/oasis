class AddImageUrlToSpace < ActiveRecord::Migration
  def change
    add_column :spaces, :imageURL, :string
  end
end
