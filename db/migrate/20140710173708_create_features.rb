class CreateFeatures < ActiveRecord::Migration
  def change
    create_table :features do |t|
      t.integer :element_id
      t.string :content

      t.timestamps
    end
  end
end
